var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bg = new Image();
var imgTank = new Image();
var imgMiss = new Image();
var imgHit = new Image();

bg.src = "bg.png";
imgTank.src = "tank.png";
imgMiss.src = "miss.png";
imgHit.src = "hit.png";

//Заголовок
var grd = ctx.createLinearGradient(0, 0, 400, 0); //градиентная заливка
grd.addColorStop(0, "Olive")
grd.addColorStop(1, "green")
ctx.strokeStyle = grd;
ctx.font = "bold 25pt Comic Sans MS";
ctx.textAlign = "center";
ctx.strokeText("Танковый бой", cvs.width / 2, 40);

//стартовая строка
ctx.font = "italic 13pt Arial";
var textColor = "black";
ctx.fillStyle = textColor;
ctx.textAlign = "left";
ctx.fillText("Для начала нажмите любую клавишу...", 20, cvs.height - 20);

//подписи полей
ctx.font = "italic 10pt Arial";
ctx.textAlign = "left";
ctx.fillText("поле игрока", 50, cvs.height - 95);
ctx.fillText("поле противника", 450, cvs.height - 95);

//вставка полей
let xBegin = 4;
let yBegin = 43;
let step = 50;

function draw() {
    ctx.drawImage(bg, 20, 60);
    ctx.drawImage(bg, 420, 60);
}
bg.onload = draw; //запуск функции после загрузки картинки

// массив возможных координат
let arrCoord = new Array;
for (let i = 0; i < 36; i++) {
    if (i < 6) arrCoord[i] = "а" + parseInt(i + 1);
    else if (i < 12) arrCoord[i] = "б" + parseInt(i - 5);
    else if (i < 18) arrCoord[i] = "в" + parseInt(i - 11);
    else if (i < 24) arrCoord[i] = "г" + parseInt(i - 17);
    else if (i < 30) arrCoord[i] = "д" + parseInt(i - 23);
    else if (i < 36) arrCoord[i] = "е" + parseInt(i - 29);
}

//запуск при нажатии клавиши
document.addEventListener("keydown", start, { once: true }) //once - функция исполнится 1 раз
function start() {
    var n = ctx.clearRect(15, cvs.height - 33, 380, 20); //затирание стартовой надписи
    setTimeout(() => input(0, 4, `Введите координаты танка: `), 5);
    //задержка, чтобы затирка стартовой надписи прошла до запуска функции
}

//функция ввода и расстановки id: 0-расстановка танков, 1-прием координат от пользователя
var arrCoordPlayer = new Array;
function input(id, n, text) {

    for (let i = 0; i < n; i++) {
        inputPlayer = prompt(text + parseInt(i + 1), "а" + parseInt(i + 1));
        let checkEnter = check(inputPlayer);
        if (checkEnter !== true) {
            alert("Нет таких координат!");
            i -= 1;
        }
        if (id == 0) {
            arrCoordPlayer[i] = inputPlayer;
            changeCoord(0, inputPlayer);
            ctx.drawImage(imgTank, xBegin + coordX, yBegin + coordY);
        }
    }

    if (id == 0) setTimeout(() => play(), 500);
    else if (id == 1) return inputPlayer;
}

//функция проверки ввода
function check(input) {
    for (let j = 0; j < 36; j++) {
        if (input === arrCoord[j]) return true;
    }
}

//функция преобразования координат
let dist;
var coordX;
var coordY;
function changeCoord(id, input) {
    if (id == 1) dist = 400;
    else dist = 0;
    if (input[0] == "а") coordY = step;
    else if (input[0] == "б") coordY = step * 2;
    else if (input[0] == "в") coordY = step * 3;
    else if (input[0] == "г") coordY = step * 4;
    else if (input[0] == "д") coordY = step * 5;
    else if (input[0] == "е") coordY = step * 6;
    if (input[1] == "1") coordX = step + dist;
    else if (input[1] == "2") coordX = step * 2 + dist;
    else if (input[1] == "3") coordX = step * 3 + dist;
    else if (input[1] == "4") coordX = step * 4 + dist;
    else if (input[1] == "5") coordX = step * 5 + dist;
    else if (input[1] == "6") coordX = step * 6 + dist;
}

//старт
function play() {
    alert("begin!")
    coordOpp();
    gunFunc()
}

//расположение противника
var arrCoordOpp = new Array;
function coordOpp() {
    for (let i = 0; i < 4; i++) {
        let checkCoordOpp;
        var rand = Math.floor(Math.random() * arrCoord.length) // рандомная позиция массива
        for (let j = 0; j < arrCoordOpp.length; j++) {
            if (arrCoord[rand] == arrCoordOpp[j]) checkCoordOpp = false; //проверка уникальности
        }
        if (checkCoordOpp !== false) arrCoordOpp[i] = arrCoord[rand];
        else i--
    }
    console.log(arrCoordOpp);
}

//массив попаданий + проверка уникальности
var arrHitShot = new Array;
function checkHitShotFunc(inputShot) {
    for (let i = 0; i < arrHitShot.length; i++) {
        if (inputShot === arrHitShot[i]) return true;
    }
}

// бой
var arrMotionPl = new Array;
function gunFunc() {
    let checkRepeat = checkRepeatFunc(shot);
    do var shot = input(1, 1, "Введите координаты выстрела")
    while (checkRepeatFunc(shot) == true);
    let checkShot = checkShotFunc(0, shot);
    let checkHitShot = checkHitShotFunc(shot)


    //if (checkRepeat == true) {
    //  alert("Повторный ввод!");
    //shot = input(1, 1, "Введите координаты выстрела");
    //}
    arrMotionPl[arrMotionPl.length] = shot;
    console.log("play | " + shot + " массив: " + arrMotionPl)

    if (checkShot == true && checkHitShot !== true) {  // проверка ввода и уникальности попадания
        arrHitShot[arrHitShot.length] = shot;
        console.log("arrHitShot: " + arrHitShot);
        hitFunc(0, shot);
    }
    else missFunc(0, shot);
}

//функция проверки повторного ввода
function checkRepeatFunc(input) {
    for (let j = 0; j < arrMotionPl.length; j++) {
        if (input === arrMotionPl[j]) {
            alert("Повторный ввод!")
            return true;
        }
    }
}

//проверка попадания
function checkShotFunc(id, inputShot) {
    for (let j = 0; j < 4; j++) {
        if (id == 0 && inputShot === arrCoordOpp[j]) return true;
        else if (id == 1 && inputShot === arrCoordPlayer[j]) return true;
    }
}

//попадание
function hitFunc(id, coord) {
    if (id == 0) changeCoord(1, coord);
    else changeCoord(0, coord);
    let z = ctx.drawImage(imgHit, xBegin + coordX, yBegin + coordY); //async и await, чтобы отрисовка прошла перед тем, как уйдет в функцию
    setTimeout(() => alert("Попал!"), 1);
    if (id == 0) setTimeout(() => countFunc(0), 5);
    else setTimeout(() => countFunc(1), 1);
}

//промах
function missFunc(id, coord) {
    if (id == 0) {
        changeCoord(1, coord);
        ctx.drawImage(imgMiss, xBegin + coordX, yBegin + coordY);
        setTimeout(() => alert("Промах"), 1);
        setTimeout(() => gunOppFunc(), 5);
    }
    else {
        changeCoord(0, coord);
        ctx.drawImage(imgMiss, xBegin + coordX, yBegin + coordY);
        setTimeout(() => alert("Промах"), 1);
        setTimeout(() => gunFunc(), 5);
    }
}

//счет
let countPlayer = 0;
let countOpp = 0;
function countFunc(result) {
    if (result == 0) {
        countPlayer++;
        console.log("Счет: " + countPlayer + " / " + countOpp)
        if (countPlayer == 4) alert("Victory!");
        else gunFunc();
    }
    else {
        countOpp++;
        console.log("Счет: " + countPlayer + " / " + countOpp)
        if (countOpp == 4) alert("Game over:(");
        else gunOppFunc();
    }
}

//ход противника
let arrMotionOp = new Array;
function gunOppFunc() {
    do var rand = Math.floor(Math.random() * arrCoord.length);
    while (checkMotionFunc(arrCoord[rand]) == true);
    checkShotFunc(1, arrCoord[rand]);
    arrMotionOp[arrMotionOp.length] = arrCoord[rand];
    console.log("comp | " + arrCoord[rand] + " массив: " + arrMotionOp);
    if (checkShotFunc(1, arrCoord[rand]) == true) hitFunc(1, arrCoord[rand]);
    else missFunc(1, arrCoord[rand]);

}

// проверка на уникальность хода
function checkMotionFunc(input) {
    for (let i = 0; i < arrMotionOp.length; i++) {
        if (input == arrMotionOp[i]) {
            console.log("Не прошла проверка уникальности: " + input)
            return true;
        }
    }
}
