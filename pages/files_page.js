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
    var masData = data.split(',')
    var masOfMas = []
    for(let i = 0; i < masData.length - 4; i++){
        var masElem = masData[i].split('%')
        console.log(masElem)
        if(masElem[0] !== "null"){
            masElem[0] = masElem[0].split('"')[3]
            name_file_class = masElem[0].split('/')
            name_file_class = name_file_class[name_file_class.length - 1]
            masElem.splice(2, 0 , name_file_class)
        }
        if (masElem[0] === 'null') {
            console.log(masElem[1])
            masElem[1] = masElem[1].replace('"', '')
            name_file_home = masElem[1].split('/')
            name_file_home = name_file_home[name_file_home.length - 1]
            masElem.splice(2, 0 , name_file_home)
        } 
        if (masElem[0] === ''){
            continue
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
                var push_file = `<div class="file_class"><a id="test_a" href="${masOfMas[i][0]}" download>${masOfMas[i][2]}</a><button class="btn" id="test_btn">&times;</button></div>`
                file_class.innerHTML += push_file
            } else {
                var push_file_h = `<div class="file_home"><a id="test" href="${masOfMas[i][1]}" download>${masOfMas[i][2]}</a><button class="btn" id="test_btn">&times;</button></div>`
                file_home.innerHTML += push_file_h
            }
        }
    }

    var text_id = masData[masData.length - 4].split(':')[1].slice(1).replaceAll('"', '')

    var homework_text = document.getElementById('homeInfo')
    homework_text.innerHTML += masData[masData.length - 3].split(":")[1].replaceAll('"', '')

    var classwork_text = document.getElementById('classInfo')
    classwork_text.innerHTML = masData[masData.length - 2].split(":")[1].replaceAll('"', '')


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
            const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files/' + file.name
            masOfMas.push([p,'','', file.name])
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
            const p = '/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files/' + file.name
            masOfMas.push(['null', p , file.name, 'null'])
            get_mas()
        })         
        .then(json => console.log(json))
        .catch(err => console.error(err))
        }



    document.addEventListener('click', function(e){
        var parent = e.target.closest(".file_class")
        var text = parent.querySelector('#test_a').getAttribute('href')
        fetch('/delete_class', {
            method: 'POST',
            body: JSON.stringify(text),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'appliction/json'
            }
        }) 
        // text.parentElement.remove();
        // text.closest('.file_class').remove();
        parent.remove()
        get_mas()
        console.log(text) 
    })

    document.addEventListener('click',  function(e) {
        var parent = e.target.closest(".file_home")
        var text = parent.querySelector('#test').getAttribute('href')
        fetch('/delete_home', {
            method: 'POST',
            body: JSON.stringify(text),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'appliction/json'
            }
        }) 
        // text.parentElement.remove();
        // parent.closest('.file_home').remove();
        parent.remove()
        get_mas()
        console.log(text) 
    })
}

request.send()