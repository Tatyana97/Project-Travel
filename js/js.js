window.addEventListener("DOMContentLoaded", function () {
    'use strict';

    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    })

    // Timer

    let deadline = '2020-04-01';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), //дата конечная - дата, которая на сегодня
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id) {

        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'), //внутри блока с id ищет все
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(deadline);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }

    }
    setClock('timer', deadline);


    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.add('more-splash');
    });

    //     class options{
    //         constructor(height, width, bg, fontSize, textAlign){
    //             this.height = height;
    //             this.width = width;
    //             this.bg = bg;
    //             this.fontSize = fontSize;
    //             this.textAlign = textAlign;
    //         }
    //          newFun = () =>{
    //             let elem = document.createElement('div');
    //             document.body.appendChild(elem);
    //             let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
    //             elem.style.cssText = param;
    //         }
    //     }
    //     const item = new Options(300, 350, "red", 14, "center");

    // item.newFun();


    // form

    let massage = {
        loading: "Загрузка",
        success: "Спасибо! Мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMassage = document.createElement('div');

    statusMassage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // удаляет стандартное поведение браузера
        form.appendChild(statusMassage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formDate = new FormData(form); // Получаем все, что отправил нам пользователь

        let obj = {}; // в него помещаем все данные
        formDate.forEach(function (value, key) { // все найденные данные помещаем в json
            obj[key] = value;
        });
        let json = JSON.stringify(obj); // превращаем в формат json

        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMassage.innerHTML = massage.loading;
            } else if (request.readyState === 4 || request.status == 200) {
                statusMassage.innerHTML = massage.success;
            } else {
                statusMassage.innerHTML = massage.failure;
            }
        }); // наблюдать за изменениями состояния нашего запроса

        for (let i = 0; i < input.length; i++) {
            input[i].value = "";

        }
    });



});