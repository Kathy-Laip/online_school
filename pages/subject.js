var request = new XMLHttpRequest() // подключение библиотеки
request.open('POST', '/subject.html', true) // открытие пришедшего запроса

const p = new Promise((resolve, reject) =>{ // промис на прочитывание данных
    request.onload = function(){
        var dataUser = request.responseText
        resolve(dataUser)
    }
}).then(dataUsers =>{
    proc(dataUsers) // функция, обрабатывающая данные
})

var curUs = null // переменная для хранения id - пользователя

const mounth = {
    "Jun": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
}

async function proc(data){ // функция для парсинга данных
    console.log(data)

    masData = data.split('",')
    var masOfMas = []
    for(let i = 0; i < masData.length; i++){
        var masElem = masData[i].split(' ')
        var masfirst = masElem[0].split('"')
        masElem[0] = masfirst[1]
        masElem[2] = mounth[masElem[2]]
        // masElem[0] = masElem[0].slice(5,7)
        // masElem[5] = masElem[5].replace('"','').replace('}','').replace('\\','')
        masElem[masElem.length - 1] = masElem[masElem.length - 1].replace('"','').replace('}','').replace('\\','')
        masOfMas.push(masElem)
    }
    console.log(masOfMas)
    

    document.querySelector('.nameSubject ').innerHTML = masOfMas[0][11]

    for(let i = 0; i < masOfMas.length; i++){
        var sub = document.querySelector('.courses')
        var name_theme = masOfMas[i].slice(12).join(' ')
        var text_courses = `<button class="btn_cour">№${i+1} ${masOfMas[i][3]}.${masOfMas[i][2]}.${masOfMas[i][4]} ${name_theme}</button>`
        sub.innerHTML += text_courses
    }

    var now_mounth = new Date().toLocaleDateString().slice(3,5)
    var now_year = new Date().getFullYear()
    var now_day = new Date().toLocaleDateString().slice(0,2)

    s_date = now_year + '-' + now_mounth + '-' + now_day

    var currentLesson = 0
    var currentDate = 0
    for(let i = 0; i < masOfMas.length; i++){
        s_subject = masOfMas[i][4] + '-' + masOfMas[i][2] + '-' + masOfMas[i][3]
        let d = new Date(s_date)
        let d1 = new Date(s_subject)
        if(s_subject < s_date){
            currentLesson += 1
            currentDate = i
        }

    }

    // console.log(currentLesson)
    // console.log(currentLesson)

    var percent = currentLesson/masOfMas.length
    percent.toFixed(2)
    percent *= 100
    percent = Math.round(percent).toString() + '%'
    // console.log(percent)
    var progress = document.querySelector('.progressCurrentCourse')
    var text_progress = `Проведено занятий ${currentLesson}/${masOfMas.length}
    <div class="containerProgress">
         <div class="greenLine"></div>
    </div>`
    var greenLine = document.querySelector('.greenLine')
    progress.innerHTML = text_progress
    if(percent !== '100%'){
        document.querySelector('.greenLine').style.width = percent
        document.querySelector('.greenLine').style.height = '100%'
        document.querySelector('.greenLine').style.backgroundColor = 'var(--green)'
        document.querySelector('.greenLine').style.borderTopLeftRadius = '15px'
        document.querySelector('.greenLine').style.borderBottomLeftRadius = '15px'
    } else {
        document.querySelector('.greenLine').style.width = percent
        document.querySelector('.greenLine').style.height = '100%'
        document.querySelector('.greenLine').style.backgroundColor = 'var(--green)'
        document.querySelector('.greenLine').style.borderRadius = '15px'
    }

    var textPlaned
    var planedLesson = document.querySelector('.planedLesson')
    if (masOfMas.length - (currentDate + 1) == 1){
        textPlaned = `Запланированные занятия:
        <div class="firstLesson">
            ${masOfMas[currentDate + 1][3]}.${masOfMas[currentDate + 1][2]} ${masOfMas[currentDate + 1][5].slice(0,5)}
        </div>
        `
        planedLesson.innerHTML = textPlaned
    } else if(masOfMas.length - (currentDate + 1) == 0){
        textPlaned = `Запланированных занятий нет`
        planedLesson.innerHTML = textPlaned
    } else{
        textPlaned = `Запланированные занятия:
        <div class="firstLesson">
            ${masOfMas[currentDate + 1][3]}.${masOfMas[currentDate + 1][2]} ${masOfMas[currentDate + 1][5].slice(0,5)}
        </div>
        <div class="secondLesson">
        ${masOfMas[currentDate + 2][3]}.${masOfMas[currentDate + 2][2]} ${masOfMas[currentDate + 2][5].slice(0,5)}
        </div>
        `
        planedLesson.innerHTML = textPlaned
    }

    document.querySelectorAll('.btn_cour').forEach(n => n.onclick = function(){
        var id_gg = 0
        var innerBtn = n.innerHTML.split(" ").slice(2).join(" ")

        for(let i = 0 ; i < masOfMas.length; i++){
            if (masOfMas[i].slice(12).join(" ") == innerBtn){
                id_gg = masOfMas[i][0]
            }
        }
        console.log(id_gg)
        console.log(innerBtn)

        let info = {
            id_group: id_gg,
            lesson: innerBtn
        }

        let info_text = {
            id_groupp: id_gg
        }

        sentInfo()

        // отсылка данных на сервер
        function sentInfo(){
            fetch('/sendInfo', {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                    // x-www-form-urlencoded
                }
            })
        }
        
        setTimeout(function(){
            window.location.href = '/files_page.html';
        }, 1000)
    })

}

request.send()
