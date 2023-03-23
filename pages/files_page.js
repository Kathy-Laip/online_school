var request = new XMLHttpRequest() // подключение библиотеки
request.open('POST', '/files_page.html', true) // открытие пришедшего запроса

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
    // const p = JSON.parse(data)
    // console.log(p)
    var masData = data.split('",')
    var masOfMas = []
    for(let i = 0; i < masData.length - 4; i++){
        var masElem = masData[i].split(' ')
        masOfMas.push(masElem)
    }
    console.log(masOfMas)
    current_lesson = masData[masData.length - 1].split('"')
    console.log(current_lesson[3])

    get_mas()

    function get_mas(){
        var file_class = document.querySelector('.classroom')
        var file_home = document.querySelector('.homework')
        file_class.innerHTML = ''
        file_home.innerHTML = ''
            for(let i = 0; i < masOfMas.length; i++){
            if(masOfMas[i][4] != 'null'){
                var push_file = `<div class="file_class">${masOfMas[i][4]}</div>`
                file_class.innerHTML += push_file
            } else {
                var push_file_h = `<div class="file_home">${masOfMas[i][3]}</div>`
                file_home.innerHTML += push_file_h
            }
        }
    }

    var text_id = masData[masData.length - 4].split(':')[1].slice(1)

    var homework_text = document.getElementById('homeInfo')
    var textHH = masData[masData.length - 3].split(':')[1].slice(1)
    console.log(textHH)
    var textH = textHH.replace("\n", " ")
    if(textH !== 'null') homework_text.innerHTML += textH


    var classwork_text = document.getElementById('classInfo')
    var textCC = masData[masData.length - 2].split(':')[1].slice(1)
    var textC = textCC.replace("\n", " ")
    if(textC !== 'null') classwork_text.innerHTML = textC


    var sub = document.querySelector('.lesson')
    sub.innerHTML = current_lesson[3]

    const btn = document.getElementById('btn1')
    const reader = new FileReader();

    const input = document.getElementById('ava')
    btn.addEventListener('click', () => {
        const files = input.files
        for (var i = 0; i < files.length; i++) {
            uploadFile(files[i]);

        }
    })

    const uploadFile = file => {
        // add the file to the FormData object
        const fd = new FormData()
        fd.append('ava', file)
        // send `POST` request
        fetch('/upload-avatar1', {
            method: 'POST',
            body: fd
        })              
        .then(res => {
            alert('Классная работа отправлена!')
            masOfMas.push(['','','', '', file.name])
            get_mas()
        } )
        // res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err))
        }


    const btn2 = document.getElementById('btn2')
    
    const input2 = document.getElementById('avatar')
    btn2.addEventListener('click', () => {
        const files = input2.files
        for (var i = 0; i < files.length; i++) {
            uploadFile2(files[i]);

        }
    })
    
    const uploadFile2 = file => {
        // add the file to the FormData object
        const fd = new FormData()
        fd.append('avatar', file)
        // send `POST` request
        fetch('/upload-avatar2', {
            method: 'POST',
            body: fd
        })     
        .then(res => {
            alert('Домашняя работа отправлена!')
            masOfMas.push(['','','', file.name, ''])
            get_mas()
        })         
        .then(json => console.log(json))
        .catch(err => console.error(err))
        }

        // let info = {
        //     id_group: masOfMas[0][2],
        //     lesson: current_lesson[3]
        // }

        // // отсылка данных на сервер
        // fetch('/sendInfo', {
        //     method: 'POST',
        //     body: JSON.stringify(info),
        //     headers: {
        //         'Accept' : 'application/json',
        //         'Content-Type': 'application/json'
        //         // x-www-form-urlencoded
        //     }
        // })
}

request.send()