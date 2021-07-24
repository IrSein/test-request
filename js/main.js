
let btnOpenModal = document.querySelector('#btnOrder');
let modalOverlay = document.querySelector('#modalOverlay');
let modalClose = document.querySelector('#modalClose');
let form = document.getElementById("form");
let inputPhone = form.elements.namedItem('phone');
let inputEmail = form.elements.namedItem('email');

btnOpenModal.onclick = function () {
    modalOverlay.classList.add('show-modal');
    modalOverlay.classList.remove('hidden-modal');
}

modalClose.onclick = function () {
    modalOverlay.classList.remove('show-modal');
    modalOverlay.classList.add('hidden-modal');
}

window.onclick = function (e) {
    if (e.target == modalOverlay) {
        modalOverlay.style.display = "none";
    }
}

// маска ввода телефона
let phoneInput = document.querySelector('#phone')
phoneInput.addEventListener('keydown', function(event) {

    document.querySelector('#validatePhone').textContent = '';
    inputPhone.style.border = '';

   if( !(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
    let mask = '+7 (000) 000-00-00'; 
    
    if (/[0-9\+\ \-\(\)]/.test(event.key)) {
        let currentString = this.value;
        let currentLength = currentString.length;
        if (/[0-9]/.test(event.key)) {
            if (mask[currentLength] == '0') {
                this.value = currentString + event.key;
            } else {
                for (let i=currentLength; i<mask.length; i++) {
                if (mask[i] == '0') {
                    this.value = currentString + event.key;
                    break;
                }
                currentString += mask[i];
                }
            }
        }
    } 
});

form.elements.submit.addEventListener("click",  ev => { 

    if(!validateEmail()) return false;
    

    if (inputPhone == null || inputPhone.value === '') {
        document.querySelector('#validatePhone').textContent = "Введен некорректный номер";
        inputPhone.style.border = '1px solid red';
        return false;
    }

    let xhr = new XMLHttpRequest();

    let json = JSON.stringify({
        email: inputEmail.value,
        phone: inputPhone.value,
    });

    xhr.open("POST", '/send.php', true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('#messageSuc').style.display = 'block';
            
        }
    }

    xhr.send(json);
});

inputPhone.addEventListener('input', function () {
    document.querySelector('#validatePhone').textContent = '';
    inputPhone.style.border = '';
    });

inputEmail.addEventListener('input', function () {
    document.querySelector('#validateEmail').textContent = '';
    inputEmail.style.border = ''
    });

function validateEmail() {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let address = form.elements.namedItem('email').value;
    if (reg.test(address) === false || address === '') {
        document.querySelector('#validateEmail').textContent = "Введен некорректный email";
        inputEmail.style.border = '1px solid red';
        return false;
    }
    return true;
}

    