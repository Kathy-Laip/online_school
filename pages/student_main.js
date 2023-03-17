var request = new XMLHttpRequest() // подключение библиотеки
request.open('POST', '/student_main.html', true) // открытие пришедшего запроса

const p = new Promise((resolve, reject) =>{ // промис на прочитывание данных
    request.onload = function(){
        var dataUser = request.responseText
        resolve(dataUser)
    }
}).then(dataUsers =>{
    proc(dataUsers) // функция, обрабатывающая данные
})

async function proc(data){ // функция для парсинга данных
    console.log(data)
    masData = data.split(',')
    var masOfMas = []
    for(let i = 0; i < masData.length; i++){
        var masElem = masData[i].split(' ')
        // masElem[0] = masElem[0].slice(5,7)
        masElem[5] = masElem[5].replace('"','').replace('}','').replace('\\','')
        masElem[6] = masElem[6].replace('"','').replace('}','').replace('\\','')
        masOfMas.push(masElem)
    }
    console.log(masOfMas)
    var now = new Date().toLocaleDateString();

    // console.log(new Date())
    var helloStudent = document.querySelector('.cont')
    var sayHello = `<div class="text_cont"> привет, ${masOfMas[0][3]}<br>сегодня ${now}</div>`
    helloStudent.innerHTML = sayHello

    for(let i = 0; i < masOfMas.length; i++){
        var sub = document.querySelector('.courses')
        var text_courses = `<button class="btn_cour">${masOfMas[i][5]}</button>`
        sub.innerHTML += text_courses
    }


    document.querySelectorAll('.btn_cour').forEach(n => n.onclick = function(){
        var id_groups = 0
        var subject = n.innerHTML
        for(let i = 0 ; i < masOfMas.length; i++){
            if (masOfMas[i][5] == subject){
                id_groups = Number(masOfMas[i][6])
            }
        }
        console.log(id_groups)

        setTimeout(function(){
            window.location.href = '/subject.html';
        }, 1000)

        sentIdGroups()
                                
        // отсылка данных на сервер
        function sentIdGroups(){
            fetch('/sendIdGroups', {
                method: 'POST',
                body: JSON.stringify(id_groups),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'appliction/json'
                }
            })
        }
    })
}


request.send()