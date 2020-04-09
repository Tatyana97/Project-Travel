window.addEventListener("DOMContentLoaded", function () {
    'use strict';

    let calc = require('./calc'),
        form = require('./form'),
        slider = require('./slider'),
        tabs = require('./tabs'),
        timer = require('./timer');
        
        calc();
        form();
        slider();
        tabs();
        timer();


});