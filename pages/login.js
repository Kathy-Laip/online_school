var request = new XMLHttpRequest() // подключение библиотеки
request.open('POST', '/logIn.html', true) // открытие пришедшего запроса

const p = new Promise((resolve, reject) =>{ // промис на прочитывание данных
    request.onload = function(){
        var dataUser = request.responseText
        resolve(dataUser)
    }
}).then(dataUsers =>{
    proc(dataUsers) // функция, обрабатывающая данные
})

var curUs = null // переменная для хранения id - пользователя

async function proc(data){ // функция для парсинга данных
    console.log(data)
    var masData = data.split(',')
    var masOfMas = []
    for(let i = 0; i < masData.length; i++){
        var masElem = masData[i].split(' ')
        // masElem[0] = masElem[0].slice(5,7)
        masElem[4] = masElem[4].replace('"','').replace('}','')
        masOfMas.push(masElem)
    }
    console.log(masOfMas)
    document.querySelector('.entrancebtn').onclick = async function(){
        const login = document.querySelector('#login').value // переменная для хранения значения о логине, ниже также для остальных полей
        const pas = document.querySelector('#password').value

        var curUs = null
        let flag = false

        // регулярные выражения для проверки данных
        var re = /\w+/
        var re2 = /\w+/

        // проверка каждого поля
        if(re.test(login)){
            if(re2.test(pas)){
                for(let i = 0; i < masOfMas.length; i++){
                    if(login === masOfMas[i][1] && pas === masOfMas[i][2]){
                            curUs = masOfMas[i][4]
                            flag = true
                            if(masOfMas[i][3] == 'преподаватель'){
                                setTimeout(function(){
                                    window.location.href = '/teacher_main.html';
                                }, 1000)
                                sentIdTecaher()
                                
                                // отсылка данных на сервер
                                function sentIdTecaher(){
                                    fetch('/sendIdTeacher', {
                                        method: 'POST',
                                        body: JSON.stringify(curUs),
                                        headers: {
                                            'Accept' : 'application/json',
                                            'Content-Type' : 'appliction/json'
                                        }
                                    })
                                }
                            } else if(masOfMas[i][3] == 'ученик'){
                                setTimeout(function(){
                                    window.location.href = '/student_main.html';
                                }, 1000)
                                
                                sentIdStudent()
                                
                                function sentIdStudent(){
                                    fetch('/sendIdStudent', {
                                        method: 'POST',
                                        body: JSON.stringify(curUs),
                                        headers: {
                                            'Accept' : 'application/json',
                                            'Content-Type' : 'appliction/json'
                                        }
                                    })
                                }
                                
                            }
                        } 
                }
                } else {
                    alert('Неверный пароль')
                }
            } else{
                alert('Неверный логин')
            }
        } 

    // }
}
// }

request.send()
