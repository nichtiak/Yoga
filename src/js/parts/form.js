function form() {
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжимся!',
        failure: 'Что-то пошло не так...'
    },
        form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),

        forma = document.getElementById('form'),
        inputs = forma.getElementsByTagName('input'),
        input1 = forma.getElementsByTagName('input')[0],
        input2 = forma.getElementsByTagName('input')[1];


    input1.name = 'email';
    input2.name = 'phone';

    input2.onkeypress = function (e) {    //отмена ввода букв

        e = e || event;

        if (e.ctrlKey || e.altKey || e.metaKey) return;

        let chr = getChar(e);

        if (chr == '+' || (chr == null)) return;

        if (chr < '0' || chr > '9') {
            return false;
        }

    };

    input[0].onkeypress = function (e) {

        e = e || event;

        if (e.ctrlKey || e.altKey || e.metaKey) return;

        let chr = getChar(e);

        if (chr == '+' || (chr == null)) return;

        if (chr < '0' || chr > '9') {
            return false;
        }

    };

    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode)
        }

        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which)
        }

        return null;
    }


    statusMessage.classList.add('status');



    // Отправка промисами

    function sendForm(elem) {
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);


            function postData(data) {

                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                    // request.send(json);

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                resolve()
                            } else {
                                reject()
                            }
                        }
                    };

                    let obj = {};

                    formData.forEach(function (value, key) {
                        obj[key] = value;
                    });

                    let json = JSON.stringify(obj);

                    request.send(json);
                });
            } //end postData

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            function clearInputs() {
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
                }
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput)
                .then(clearInputs);
        });
    }
    sendForm(form);
    sendForm(forma);
}

module.exports = form;