var request = new XMLHttpRequest()

document.querySelector('.btnappbtn').onclick = function(){
    var surname = document.getElementById('text').value
    var subb = document.getElementById('subb').value
    var number_phone = document.getElementById('text1').value
    var email = document.getElementById('text2').value

    let info = {
        sur: surname,
        subjects: subb,
        phone: number_phone,
        em: email
    }
    sent(info)
}

function sent(info){
    fetch('/sentInfo', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.info.sur)
    })
}