function forms() {

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
}

module.exports = forms;