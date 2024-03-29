var request = new XMLHttpRequest() // подключение библиотеки
request.open('POST', '/teacher_main.html', true) // открытие пришедшего запроса

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
    var masData = data.split(',')
    console.log(masData)
    masOfMas = []
    for(let i = 0; i < masData.length; i++){
        var masElem = masData[i].split(' ')
        masElem[0] = masElem[0].replace('{','').split('"')[1]
        masElem[6] = masElem[6].replace('"','').replace('}','')
        masOfMas.push(masElem)
    }
    console.log(masOfMas)
    var count = document.querySelector('.count_student')
    var info = `Ученики: ${masOfMas.length}`
    count.innerHTML  = info
    for(let i = 0; i < masOfMas.length; i++){
        var inp = document.querySelector('.students_container')
        var str = `<button class="stud">${masOfMas[i][1]} ${masOfMas[i][2]} ${masOfMas[i][3]} ${masOfMas[i][4]} ${masOfMas[i][6]}</button>`
        inp.innerHTML += str
    }

    document.querySelectorAll('.stud').forEach(n => n.onclick = function(){
        var id_groups = 0
        var stud = n.innerHTML
        console.log(stud)
        for(let i = 0 ; i < masOfMas.length; i++){
            var innerMas = masOfMas[i].slice(1,5).join(' ') + ' ' + masOfMas[i][6]
            console.log(innerMas)
            if (innerMas == stud){
                id_groups = Number(masOfMas[i][0])
            }
        }
        console.log(id_groups)

        setTimeout(function(){
            window.location.href = '/teacher_check_stud_main.html';
        }, 1000)

        sentIdGroups()
                                
        // отсылка данных на сервер
        function sentIdGroups(){
            fetch('/sendIdGroupStud', {
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