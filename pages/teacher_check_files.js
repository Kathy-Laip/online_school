var request = new XMLHttpRequest() // подключение библиотеки
request.open('POST', '/teacher_check_files.html', true) // открытие пришедшего запроса

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
    var masOfMas = []
    for(let i = 0; i < masData.length - 4; i++){
        var masElem = masData[i].split('%')
        if(masElem[0] !== "null"){
            masElem[0] = masElem[0].split('"')[3]
            name_file_class = masElem[0].split('/')
            name_file_class = name_file_class[name_file_class.length - 1]
            masElem.splice(2, 0 , name_file_class)
        }
        if (masElem[0] === 'null') {
            masElem[1] = masElem[1].replace('"', '')
            name_file_home = masElem[1].split('/')
            name_file_home = name_file_home[name_file_home.length - 1]
            masElem.splice(2, 0 , name_file_home)
        } 
        masOfMas.push(masElem)
    }
    console.log(masOfMas)
    current_lesson = masData[masData.length - 1].split('"')
    // console.log(current_lesson[3])

    get_mas()

    function get_mas(){
        var file_class = document.querySelector('.classroom')
        var file_home = document.querySelector('.homework')
        file_class.innerHTML = ''
        file_home.innerHTML = ''
            for(let i = 0; i < masOfMas.length; i++){
            if(masOfMas[i][0] != 'null'){
                var push_file = `<div class="file_class"><a href="${masOfMas[i][0]}" download>${masOfMas[i][2]}</a></div>`
                file_class.innerHTML += push_file
            } else {
                var push_file_h = `<div class="file_class"><a href="${masOfMas[i][1]}" download>${masOfMas[i][2]}</a></div>`
                file_home.innerHTML += push_file_h
            }
        }
    }

    var text_id = masData[masData.length - 4].split(':')[1].slice(1).replace('"', '')

    var homework_text = document.getElementById('homeInfo')
    homework_text.innerHTML += masData[masData.length - 3].split(":")[1].replaceAll('"', '')


    var classwork_text = document.getElementById('classInfo')
    classwork_text.innerHTML = masData[masData.length - 2].split(":")[1].replaceAll('"', '')


    var btnSaveHome = document.getElementById('homeSaveInfo')
    btnSaveHome.addEventListener('click', () => {
        let update = {
            text: homework_text.value,
            id: text_id
        }
        fetch('/updateSave', {
            method: 'POST',
            body: JSON.stringify(update)
        })  
        .then(res => alert('Сохранено!'))
    })

    var btnSaveClass = document.getElementById('classSaveInfo')
    btnSaveClass.addEventListener('click', () => {
        let update = {
            text: classwork_text.value,
            id: text_id
        }
        fetch('/updateSaveClass', {
            method: 'POST',
            body: JSON.stringify(update)
        })  
        .then(res => alert('Сохранено!'))
    })


    var sub = document.querySelector('.lesson')
    sub.innerHTML = current_lesson[3]

}
request.send()