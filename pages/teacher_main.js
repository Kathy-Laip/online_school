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
    var masData = data.split(',')
    console.log(masData)
    masOfMas = []
    for(let i = 0; i < masData.length; i++){
        var masElem = masData[i].split(' ')
        masElem[7] = masElem[7].replace('"','').replace('}','')
        masOfMas.push(masElem)
    }
    console.log(masOfMas)
    var count = document.querySelector('.count_student')
    var info = `Ученики: ${masOfMas.length}`
    count.innerHTML  = info
    for(let i = 0; i < masOfMas.length; i++){
        var inp = document.querySelector('.students_container')
        var str = `<div class="stud">${masOfMas[i][2]} ${masOfMas[i][3]} ${masOfMas[i][4]} ${masOfMas[i][5]} ${masOfMas[i][7]}</div>`
        inp.innerHTML += str
    }
}

request.send()