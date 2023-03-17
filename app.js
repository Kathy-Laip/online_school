let express = require('express') // node express
var bodyParser = require('body-parser') 
const fileUpload = require('express-fileupload')
const formidable = require('formidable');
const { Blob } = require("buffer");
let app = express()
var jsonParser = bodyParser.json() // преобразование json -  строк
app.use(express.json()) // использование json
app.use(express.static('pages')) //использование папки public, в котором хранятся html, css документы
app.use(fileUpload())

let mysql = require('mysql') // mysql модуль
let con = mysql.createConnection({ // подключение к базе данных
    host: '127.0.0.1',
    user: 'root',
    password: 'regopi09',
    database: 'online_school'
});

app.use(express.json()) // использование json
app.use(express.static('public')) //использование папки public, в котором хранятся html, css документы
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

con.connect(function(err){ // попытка подключение к базе данных
    if(err) throw err
    console.log('Connected!')
})

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

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
        infoUser = JSON.parse(chunk)
    });
    req.on('end', () => {
        console.log(infoUser)
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
        curUs += chunk.toString()
    });
    req1.on('end', () => {
        console.log(curUs)
    })
    res1.redirect(307, '/teacher_main.html')
    app.post('/teacher_main.html',(req2,res2)=>{
        con.query(
            'select DISTINCT teacher.id_group, student.id, student.surname, number_class, exam_type from teacher inner join online_school.group on teacher.id_group=online_school.group.id_group inner join student on teacher.id_group=student.id_group inner join class on class.id=student.id_class inner join exam on exam.id=student.id_exam where teacher.id = '+curUs+';',
            async function(error, result){
                if(error) throw error;
                let ress = {}
                for(let i = 0; i < result.length; i++){
                    ress[result[i]['id']] = `${result[i]['id']} ${result[i]['id_group']} ${result[i]['surname']} ${result[i]['number_class']} ${result[i]['exam_type']}`
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
        curUs += chunk.toString()
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
        id_gr += chunk.toString()
    });
    req3.on('end', () => {
        console.log(id_gr)
    })
    res3.redirect(307, '/subject.html')
    app.post('/subject.html',(req4,res4)=>{
        con.query(
            'select distinct timetable.id, timetable.time, timetable.id_group, timetable.lesson_topic, subject.subject from online_school.timetable inner join group_number on timetable.id_group = group_number.id inner join student_course on group_number.id= student_course.id_group inner join online_school.subject on student_course.id_subject = subject.id where timetable.id_group = '+id_gr+';',
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

// var d
// app.post('/getfiles', function(req, res){
//     // req.on('data', chunk =>{
//     //     d = chunk
//     //     console.log(d)
//     // });
//     // req.on('end', () => {
//     //     console.log(d)
//     //     con.query(
//     //         `INSERT INTO online_school.new_table(id, data) values(1, LOAD_FILE('${d}'))`,
//     //         async function(error, result){
//     //             if(error) throw error;
//     //             console.log('ok')
//     //         }
//     //     )
//     // })
//     var r = req.files.
//     console.log(r)
//            con.query(
//             `INSERT INTO online_school.new_table(id, data) values(1, LOAD_FILE('${r}'))`,
//             async function(error, result){
//                 if(error) throw error;
//                 console.log('ok')
//             }
//         )
// })

// app.post('/upload', function(req, res) {
//     const form = new formidable.IncomingForm();
//     // Parse `req` and upload all associated files
//     form.parse(req, function(err, fields, files) {
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }
//       const [firstFileName] = Object.keys(files);
  
//       res.json({ filename: firstFileName });
//     });
//     console.log('ok')
//   });


app.post('/upload-avatar', async (req, res) => {
    let avatar = req.files.avatar
    if(avatar){
        console.log('ok')
        console.log(avatar.data)
    } else{ console.log('no')}
    const buff = Buffer.from(avatar.data); // Node.js Buffer
    const blob = new Blob([buff]); // JavaScript Blob
    var query = "INSERT INTO online_school.new_table SET ?",
    values = {
        id: 1,
        data: buff.length,
    };
    // con.query(
    //                 "INSERT INTO online_school.new_table(id, data) values(1, '"+buff+"')",
    //                 async function(error, result){
    //                     if(error) throw error;
    //                     console.log('ok')
    //                 })
    con.query(query, values, async function(error, result){
                            if(error) throw error;
                            console.log('ok')})
    // try {
    //   if (!req.files) {
    //     res.send({
    //       status: false,
    //       message: 'No file uploaded'
    //     })
    //   } else {
    //     // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    //     let avatar = req.files.avatar
    //     console.log('ok')
  
    //     // Use the mv() method to place the file in the upload directory (i.e. "uploads")
    //     avatar.mv('./uploads/' + avatar.name)
  
    //     //send response
    //     res.send({
    //       status: true,
    //       message: 'File is uploaded',
    //       data: {
    //         name: avatar.name,
    //         mimetype: avatar.mimetype,
    //         size: avatar.size
    //       }
    //     })
    //   }
    // } catch (err) {
    //   res.status(500).send(err)
    // }
})


