'use script'
const body = document.querySelector('body');
const timeOfDay = ['Добрый день', 'Добрый вечер', 'Доброй ночи', 'Доброе утро'];
const dayOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четвер', 'Пятница', 'Субота', 'Воскресенье'];
const arrayEndings = ['день', 'дня', 'дней'];
let date = new Date();
let newYear = new Date("1 January 2022")
let result = [];

let time = date.getHours();
let day = date.getDay();
let timeNow = date.toTimeString().substr(0, 8);


const dayWeek = function () {
    if (day != 0) {
        day = day - 1;
    } else {
        day = 6;
    }
    if ((time >= 5) && (time < 11)) {
        result.push(timeOfDay[0])
    } else if ((time >= 11) && (time < 17)) {
        result.push(timeOfDay[0])
    } else if ((time >= 17) && (time < 23)) {
        result.push(timeOfDay[1])
    } else {
        result.push(timeOfDay[2])
    }
    result.push(`Сегодня: ${dayOfWeek[day]}`);
}

const currTime = function () {
    if (time >= 0 && time < 12) {
        result.push(`Текущее время: ${timeNow} AM`)
    } else {
        result.push(`Текущее время: ${timeNow} PM`)
    }
}

const endingsForDay = function (n) {
    let inone = n % 10;
    return inone == 1 && n != 11 ? 0 :
        (n > 4 && n < 21) || (inone > 4 && inone <= 9) ? 2 :
            inone == 0 ? 2 :
                1;
};

const newYearLeft = function () {
    let millSeconds = 24 * 60 * 60 * 1000;
    let daysLeft = Math.floor((newYear.getTime() - date.getTime()) / millSeconds);
    result.push(`До нового года ${daysLeft} ${arrayEndings[endingsForDay(daysLeft)]}.`)
}

const published = function (yourArray) {
    date = new Date();
    body.innerHTML = '';
    result = [];
    time = date.getHours();
    day = date.getDay();
    timeNow = date.toTimeString().substr(0, 8);
    dayWeek();
    currTime();
    newYearLeft()
    yourArray.forEach(function (part) {
        let p = document.createElement('p');
        p.textContent = part;
        body.appendChild(p)
    })
}

published(result);

setInterval(() => {
    published(result);
}, 1000)
