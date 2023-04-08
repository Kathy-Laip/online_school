let express = require('express') // node express
const fileUpload = require('express-fileupload')
const formidable = require('formidable');
const { Blob } = require("buffer");
var fs = require('fs');
var path = require('path')
let app = express()
app.use(fileUpload())

const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'

let mysql = require('mysql') // mysql модуль
let con = mysql.createConnection({ // подключение к базе данных
    host: '127.0.0.1',
    user: 'root',
    password: 'regopi09',
    database: 'online_school'
});

app.use(express.static('pages')) //использование папки public, в котором хранятся html, css документы

con.connect(function(err){ // попытка подключение к базе данных
    if(err) throw err
    console.log('Connected!')
})

// app.set('view engine', 'html') // работа с html через pug

app.listen(3306, function(){ // подклчюение к порту
    console.log('node express work on 3306')
});

app.get('/index.html', async function(req, res){ 
    res.sendFile('index.html', {root : __dirname + '/pages'}) // отсылка html страниц
});


app.post('/sentInfo', function(req, res){ // 
    infoUser = ''
    req.on('data', chunk =>{
        infoUser = chunk.toString()
    });
    req.on('end', () => {
        con.query(
            `INSERT INTO online_school.record(surname, subject, number_phone, email) VALUES ('${infoUser.sur}', '${infoUser.subjects}', '${infoUser.phone}','${infoUser.em}')`,
            async function(error, result){
                if(error) throw error;
                    console.log('cant sentinfo into record')
            }
        )
    });
})

con.query( // взятие данных о пользователях
    'SELECT id, login, password, status, id_dop FROM online_school.users',
    async function(error, result){
        if(error) throw error;
        let dataUsers = {}
        for(let i = 0; i < result.length; i++){
            dataUsers[result[i]['id']] = `${result[i]['id']} ${result[i]['login']} ${result[i]['password']} ${result[i]['status']} ${result[i]['id_dop']}`
        }
        console.log(dataUsers)
        app.post('/logIn.html', (req,res) => { // отсылка данных на страницу входа
            res.send(dataUsers)
        })
    }

)

var curUs 
var id_gr

app.post('/sendIdTeacher', function(req1, res1){ // принятие данных о пользователе при входе на сайт
    curUs = ''
    req1.on('data', chunk =>{
        curUs = JSON.parse(chunk)
    });
    req1.on('end', () => {
        console.log(curUs)
    })
    res1.redirect(307, '/teacher_main.html')
    app.post('/teacher_main.html',(req2,res2)=>{
        con.query(
            // 'select distinct student.id, online_school.group.id_group, student.surname, number_class, exam_type from teacher inner join online_school.group_number on teacher.id_group=group_number.id inner join online_school.group on group_number.id=online_school.group.id_group inner join student on online_school.group.id_student=student.id inner join class on class.id=student.id_class inner join exam on exam.id=student.id_exam where teacher.id = '+curUs+';',
            'select distinct student.id, student.surname, number_class, exam_type from teacher_group inner join online_school.group_number on teacher_group.id_group=group_number.id  inner join online_school.group on group_number.id=online_school.group.id_group  inner join student on online_school.group.id_student=student.id inner join class on class.id=student.id_class inner join exam on exam.id=student.id_exam where teacher_group.id_teacher = '+curUs+';',
            async function(error, result){
                if(error) throw error;
                let ress = {}
                for(let i = 0; i < result.length; i++){
                    ress[result[i]['id']] = `${result[i]['id']} ${result[i]['surname']} ${result[i]['number_class']} ${result[i]['exam_type']}`
                }
                console.log(ress)
                res2.send(ress)
            }
        )
    })
})

app.post('/sendIdStudent', function(req3, res3){ // принятие данных о пользователе при входе на сайт
    curUs = ''
    req3.on('data', chunk =>{
        curUs = JSON.parse(chunk)
    });
    req3.on('end', () => {
        console.log(curUs)
    })
    res3.redirect(307, '/student_main.html')
    app.post('/student_main.html',(req4,res4)=>{
        con.query(
            'select student_course.id, student_course.id_student, surname,  subject.subject, student_course.id_group from online_school.student_course inner join subject on student_course.id_subject = subject.id inner join student on student_course.id_student = student.id inner join group_number on group_number.id = student_course.id_group where student_course.id_student = '+curUs+';',
            async function(error, result){
                if(error) throw error;
                let ress = {}
                for(let i = 0; i < result.length; i++){
                    ress[result[i]['id']] = `${result[i]['id']} ${result[i]['id_student']} ${result[i]['surname']} ${result[i]['subject']} ${result[i]['id_group']}`
                }
                console.log(ress)
                res4.send(ress)
            }
        )
    })
})

app.post('/sendIdGroups', function(req3, res3){ // принятие данных о пользователе при входе на сайт
    id_gr = ''
    req3.on('data', chunk =>{
        id_gr = JSON.parse(chunk)
    });
    req3.on('end', () => {
        console.log(id_gr)
    })
    res3.redirect(307, '/subject.html')
    app.post('/subject.html',(req4,res4)=>{
        con.query(
            'select distinct timetable.id, timetable.time, timetable.id_group, timetable.lesson_topic, subject.subject from online_school.timetable inner join group_number on timetable.id_group = group_number.id inner join student_course on group_number.id= student_course.id_group inner join online_school.subject on student_course.id_subject = subject.id where timetable.id_group = '+id_gr+' order by time asc;',
            async function(error, result){
                if(error) throw error;
                let ress = {}
                for(let i = 0; i < result.length; i++){
                    ress[result[i]['id']] = `${result[i]['id']} ${result[i]['time']} ${result[i]['id_group']} ${result[i]['subject']} ${result[i]['lesson_topic']}`
                }
                console.log(ress)
                res4.send(ress)
            }
        )
    })
})

var id_les
var name_lesson
app.post('/sendInfo', function(req22, res22){
    var po3 = ''
    req22.on('data', chunk =>{
        po3 = JSON.parse(chunk)
        id_les = po3.id_group
        name_lesson = po3.lesson
    });
    req22.on('end', () => {
        console.log(po3)
        // console.log(id_les)
        // console.log(name_lesson)
    })
    res22.redirect(307, '/files_page.html')
    app.post('/files_page.html',(req4,res4)=>{
            con.query(
            'select * from online_school.student_assignments where id_student = '+curUs+' and id_lesson='+id_les+'',
            async function(error, result){
                if(error) throw error;
                let ress = {}
                for(let i = 0; i < result.length; i++){
                    ress[result[i]['id']] = `${result[i]['classwork']}%${result[i]['homework']}`
                }
                ress['text_id'] = `${result[0]['id']}`
                ress['homework_text'] = fs.readFileSync(`${result[0]['homework_text']}`).toString('utf-8')
                ress['classwork_text'] = fs.readFileSync(`${result[0]['classwork_text']}`).toString('utf-8')
                ress['name_lesson'] = name_lesson
                console.log(ress)
                res4.send(ress)
            }
        )
    })
})


app.post('/upload-avatar1', async (req, res) => {
    let avatar = req.files.ava
    if(avatar){
        console.log('ok')
        name_file = avatar.name
        f = avatar.data
    } else{ console.log('no')}
    // const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'
    var pathp = path.join(p, '/', name_file)
    try{
        var d = fs.writeFileSync(pathp, f)
    }
    catch(err){
        console.error(err)
    }
    var query = 'INSERT INTO online_school.student_assignments SET ?', 
    // var query = "UPDATE online_school.timetable SET ?"
    values = {
        id_student: curUs,
        id_lesson: Number(id_les),
        classwork: pathp,
        classwork_name_file: name_file,
    }; 
    con.query(query, values, async function(error, result){
        if(error) throw error;
            res.send('ok')
    })

})

app.post('/upload-avatar2', async (req, res) => {
    let avatar = req.files.avatar
    if(avatar){
        console.log('ok')
        name_file = avatar.name
        f = avatar.data
        console.log(f, name_file)
    } else{ console.log('no')}
    // const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'
    var pathp = path.join(p, '/', name_file)
    try{
        var d = fs.writeFileSync(pathp, f)
    }
    catch(err){
        console.error(err)
    }
    var query = `INSERT INTO online_school.student_assignments SET ?`, 
    // var query = "UPDATE online_school.timetable SET ?"
    values = {
        id_student: curUs,
        id_lesson: Number(id_les),
        homework: pathp,
        homework_name_file: avatar.name,
    }; 
    con.query(query, values, async function(error, result){
        if(error) throw error;
            res.send('ok')})
})


var curStud
var id_gr_stud
app.post('/sendIdGroupStud', function(req3, res3){ // принятие данных о пользователе при входе на сайт
    curStud = ''
    req3.on('data', chunk =>{
        curStud = JSON.parse(chunk)
    });
    req3.on('end', () => {
        console.log(curStud)
    })
    res3.redirect(307, '/teacher_check_stud_main.html')
    app.post('/teacher_check_stud_main.html',(req4,res4)=>{
        con.query(
            'select student_course.id, student_course.id_student, surname,  subject.subject, student_course.id_group from online_school.student_course inner join subject on student_course.id_subject = subject.id inner join student on student_course.id_student = student.id inner join group_number on group_number.id = student_course.id_group where student_course.id_student = '+curStud+';',
            async function(error, result){
                if(error) throw error;
                let ress = {}
                for(let i = 0; i < result.length; i++){
                    ress[result[i]['id']] = `${result[i]['id']} ${result[i]['id_student']} ${result[i]['surname']} ${result[i]['subject']} ${result[i]['id_group']}`
                }
                console.log(ress)
                res4.send(ress)
            }
        )
    })
})

app.post('/sendIdGroupsStudSub', function(req3, res3){ // принятие данных о пользователе при входе на сайт
    id_gr_stud = ''
    req3.on('data', chunk =>{
        id_gr_stud = JSON.parse(chunk)
    });
    req3.on('end', () => {
        console.log(id_gr_stud)
    })
    res3.redirect(307, '/teacher_check_subject.html')
    app.post('/teacher_check_subject.html',(req4,res4)=>{
        con.query(
            'select distinct timetable.id, timetable.time, timetable.id_group, timetable.lesson_topic, subject.subject from online_school.timetable inner join group_number on timetable.id_group = group_number.id inner join student_course on group_number.id= student_course.id_group inner join online_school.subject on student_course.id_subject = subject.id where timetable.id_group = '+id_gr_stud+' order by time asc;',
            async function(error, result){
                if(error) throw error;
                let ress = {}
                for(let i = 0; i < result.length; i++){
                    ress[result[i]['id']] = `${result[i]['id']} ${result[i]['time']} ${result[i]['id_group']} ${result[i]['subject']} ${result[i]['lesson_topic']}`
                }
                // console.log(ress)
                res4.send(ress)
            }
        )

    })
})

var id_les_teach
var name_lesson_teach
app.post('/sendInfoStudent', function(req22, res22){
    var po4 = ''
    req22.on('data', chunk =>{
        po4 = JSON.parse(chunk)
        id_les_teach = po4.id_group
        name_lesson_teach = po4.lesson
    });
    req22.on('end', () => {
        console.log(po4)
        // console.log(id_les)
        // console.log(name_lesson)
    })
    res22.redirect(307, '/teacher_check_files.html')
    app.post('/teacher_check_files.html',(req4,res4)=>{
            con.query(
            'select * from online_school.student_assignments where id_student = '+curStud+' and id_lesson='+id_les_teach+'',
            async function(error, result){
                if(error) throw error;
                let ress = {}
                for(let i = 0; i < result.length; i++){
                    ress[result[i]['id']] = `${result[i]['classwork']}%${result[i]['homework']}`
                }
                ress['text_id'] = `${result[0]['id']}`
                ress['homework_text'] = fs.readFileSync(`${result[0]['homework_text']}`).toString('utf-8')
                ress['classwork_text'] = fs.readFileSync(`${result[0]['classwork_text']}`).toString('utf-8')
                ress['name_lesson'] = name_lesson_teach
                console.log(ress)
                res4.send(ress)
            }
        )
    })
})

app.post('/up1', async (req, res) => {
    let avatar = req.files.ava
    if(avatar){
        console.log('ok')
        name_file = avatar.name
        f = avatar.data
    } else{ console.log('no')}
    // const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'
    var pathp = path.join(p, '/', name_file)
    try{
        var d = fs.writeFileSync(pathp, f)
    }
    catch(err){
        console.error(err)
    }
    var query = 'INSERT INTO online_school.student_assignments SET ?'
    // var query = "UPDATE online_school.timetable SET ?"
    var values = {
        id_student: curUs,
        id_lesson: Number(id_les_teach),
        classwork: pathp,
        classwork_name_file: name_file,
    }; 
    con.query(query, values, async function(error, result){
        if(error) throw error;
            res.send('ok')
    })

})

app.post('/up2', async (req, res) => {
    let avatar = req.files.avatar
    if(avatar){
        console.log('ok')
        name_file = avatar.name
        f = avatar.data
        console.log(f, name_file)
    } else{ console.log('no')}
    // const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'
    var pathp = path.join(p, '/', name_file)
    try{
        var d = fs.writeFileSync(pathp, f)
    }
    catch(err){
        console.error(err)
    }
    var query = `INSERT INTO online_school.student_assignments SET ?`, 
    // var query = "UPDATE online_school.timetable SET ?"
    values = {
        id_student: curUs,
        id_lesson: Number(id_les_teach),
        homework: pathp,
        homework_name_file: avatar.name,
    }; 
    con.query(query, values, async function(error, result){
        if(error) throw error;
            res.send('ok')})
})


var t
var id_text
var id_t 
app.post('/updateSave', function(req22, res22){
    var po4 = ''
    req22.on('data', chunk =>{
        po4 = JSON.parse(chunk)
        t = po4.text
        id_text = po4.id
        id_t = po4.id 
        try{
            var d = fs.writeFileSync(id_text, t)
        }
        catch(err){
            console.error(err)
        }
    });
    // req22.on('end', () => {
    //     console.log(po4)
    //     con.query(
    //         'UPDATE online_school.student_assignments SET homework_text = "'+pathp+'" WHERE student_assignments.id = '+id_t+'',
    //         async function(error, result){
    //             if(error) throw error;
    //             console.log('text!')
    //             res22.send('ok')
    //         }
    //     )
    // })
})

var tt
var id_textt
var id_tt
app.post('/updateSaveClass', function(req22, res22){
    var po4 = ''
    req22.on('data', chunk =>{
        po4 = JSON.parse(chunk)
        tt = po4.text
        id_textt = po4.id
        id_tt = po4.id
        try{
            var d = fs.writeFileSync(id_textt, tt)
        }
        catch(err){
            console.error(err)
        }
    });
    // req22.on('end', () => {
    //     console.log(po4)
    //     con.query(
    //         'UPDATE online_school.student_assignments SET classwork_text = "'+pathp+'" WHERE student_assignments.id = '+id_tt+'',
    //         async function(error, result){
    //             if(error) throw error;
    //             console.log('text!')
    //             res22.send('ok')
    //         }
    //     )
    // })
})

app.post('/up', function(req,res){
    let a = req.files.avatar
    if(a){
        console.log('ok')
        name_file = a.name
        f = a.data
    } else{ console.log('no')}
    // const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'
    var pathp = path.join(p, '/', name_file)
    try{
        var d = fs.writeFileSync(pathp, f)
    }
    catch(err){
        console.error(err)
    }

})

var file_delete_path
app.post('/delete_class', function(req,res){
    req.on('data', chunk =>{
        file_delete_path = JSON.parse(chunk)
    })
    req.on('end', () => {
        fs.rmSync(file_delete_path, {force:true})
        // fs.unlinkSync(file_delete_path);
        con.query(
            'delete from online_school.student_assignments WHERE student_assignments.classwork = "'+file_delete_path+'"',
            async function(error, result){
                if(error) throw error;
            }
        )
    })
})

var file_delete_path2
app.post('/delete_home', function(req,res){
    req.on('data', chunk =>{
        file_delete_path2 = JSON.parse(chunk)})
    req.on('end', () => {
        fs.rmSync(file_delete_path2, {force:true})
        // fs.unlinkSync(file_delete_path2);
        con.query(
            'delete from online_school.student_assignments WHERE student_assignments.homework = "'+file_delete_path2+'"',
            async function(error, result){
                if(error) throw error;
            }
        )
    })
})

var day
var theme
var last_lesson
app.post('/d', function(req, res){
    var ddd = ''
    req.on('data', chunk =>{
        ddd = JSON.parse(chunk)
        console.log(ddd)
        day = ddd.da
        theme = ddd.th
        console.log(theme, day)
    })
    req.on('end', () => {
        console.log(ddd)
        console.log(theme, day)
        con.query(
            'insert into online_school.timetable(time, id_group, lesson_topic) values("'+day+'", '+id_gr_stud+', "'+theme+'")',
            async function(error, result){
                res.send('ok')
            }
        )
        con.query(
            'select MAX(timetable.id) from online_school.timetable',
            async function(error, result){
                last_lesson = result[0]['MAX(timetable.id)']
                console.log(last_lesson)
                // const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'
                new_name_file_for_lesson_home = id_gr_stud + '_' + theme + 'home.docx'
                new_name_file_for_lesson_class = id_gr_stud + '_' + theme + 'class.docx'
                new_path_home = path.join(p, '/', new_name_file_for_lesson_home)
                new_path_class = path.join(p, '/', new_name_file_for_lesson_class)
                console.log(curStud)
                console.log(last_lesson)
                console.log(new_name_file_for_lesson_home)
                console.log(new_name_file_for_lesson_class)
                console.log(new_path_home)
                console.log(new_path_class)
                var students = []
                con.query(
                    'select id_student from online_school.group where group.id_group = '+id_gr_stud+'',
                    async function(error, result){
                    for(let i = 0; i < result.length; i++){
                        students.push(result[i]['id_student'])
                    }
                    console.log(students)
                    for(let i = 0; i < students.length; i++){
                        con.query(
                            'insert into online_school.student_assignments(id_student, id_lesson, homework, homework_name_file, classwork, classwork_name_file, homework_text, classwork_text) values('+students[i]+', '+last_lesson+', "'+new_path_home+'", "'+new_name_file_for_lesson_home+'", "'+new_path_class+'", "'+new_name_file_for_lesson_class+'", "'+new_path_home+'", "'+new_path_class+'")',
                            async function(error, result){
                                if(error) res.send('что-то пошло не так, попробуйте снова')
                            }
                        )
                    }
                })
                fs.closeSync(fs.openSync(new_path_class, 'w'))
                fs.closeSync(fs.openSync(new_path_home, 'w'))
                }
        )

    })
})

app.post('/deleteLesson', function(req, res){
    var deleteLesson = ''
    req.on('data', chunk =>{
        deleteLesson = JSON.parse(chunk)
        console.log(deleteLesson)
    })
    req.on('end', () => {
        // const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'
        var n_f = id_gr_stud + '_' + deleteLesson + 'home.docx'
        var n_f2 = id_gr_stud + '_' + deleteLesson + 'class.docx'
        var deleteFileName = path.join(p, '/', n_f)
        var deleteFileName2 = path.join(p, '/', n_f2)
        console.log(deleteFileName)
        console.log(deleteFileName2)
        var students = []
        con.query(
            'select id_student from online_school.group where group.id_group = '+id_gr_stud+'',
            async function(error, result){
            for(let i = 0; i < result.length; i++){
                students.push(result[i]['id_student'])
            }
            console.log(students)
            for(let i = 0; i < students.length; i++){
                con.query(
                    'delete from student_assignments where homework = "'+deleteFileName+'" and student_assignments.id_student = '+students[i]+'',
                    async function(error, result){
                    }
                )
            }
            con.query(
                'delete from timetable where lesson_topic = "'+deleteLesson+'"',
                async function(error, result){
                    
                }
            )
            fs.rmSync(deleteFileName, {force:true})
            fs.rmSync(deleteFileName2, {force:true})
        })
    })
})

app.post('/updateLesson', function(req, res){
    // let info = {
    //     old: text_old,
    //     date: info_button,
    //     theme: info_button_theme
    // }
    var updateLesson 
    var old_file
    var new_date
    var new_file
    req.on('data', chunk =>{
        updateLesson = JSON.parse(chunk)
        old_file = updateLesson.old
        new_date = updateLesson.date.toString()
        new_file = updateLesson.theme
        console.log(new_date)
    })
    req.on('end', () => {
        // const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files'
        var n_f = id_gr_stud + '_' + new_file + 'home.docx'
        var n_f2 = id_gr_stud + '_' + new_file + 'class.docx'
        var updateFileName = path.join(p, '/', n_f)
        var updateFileName2 = path.join(p, '/', n_f2)
        console.log(updateFileName)
        console.log(updateFileName2)
        var n_f_o = id_gr_stud + '_' + old_file + 'home.docx'
        var n_f_o2 = id_gr_stud + '_' + old_file + 'class.docx'
        var updateFileName_o = path.join(p, '/', n_f_o)
        var updateFileName_o2 = path.join(p, '/', n_f_o2)
        console.log(updateFileName_o)
        console.log(updateFileName_o2)
        var students = []
        // values = {
        //     lesson_topic: new_file,
        //     time: new_date,
        // }; 
        con.query(
            'UPDATE timetable SET timetable.lesson_topic = "'+new_file+'", timetable.time = "'+new_date+'" WHERE timetable.lesson_topic = "'+old_file+'"',
            async function(error, result){
                fs.rmSync(updateFileName_o, {force:true})
                fs.rmSync(updateFileName_o2, {force:true})
                fs.closeSync(fs.openSync(updateFileName, 'w'))
                fs.closeSync(fs.openSync(updateFileName2, 'w'))
                con.query(
                    'select id_student from online_school.group where group.id_group = '+id_gr_stud+'',
                    async function(error, result){
                    for(let i = 0; i < result.length; i++){
                        students.push(result[i]['id_student'])
                    }
                    console.log(students)
                    for(let i = 0; i < students.length; i++){
                        con.query(
                            'UPDATE student_assignments SET student_assignments.homework = "'+updateFileName+'", student_assignments.homework_name_file = "'+n_f+'", student_assignments.classwork = "'+updateFileName2+'", student_assignments.classwork_name_file = "'+n_f2+'", student_assignments.homework_text = "'+updateFileName+'", student_assignments.classwork_text = "'+updateFileName2+'" where student_assignments.homework = "'+updateFileName_o+'" and student_assignments.id_student = '+students[i]+'',
                            async function(error, result){
                                
                            }
                        )
                    }
                    
                })
            }
        )
    })
})