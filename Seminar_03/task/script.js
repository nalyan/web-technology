var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bg = new Image();
var imgTank1 = new Image();
var imgTank2 = new Image();
var imgTank3 = new Image();
var imgTank4 = new Image();
var imgMiss = new Image();

bg.src = "bg.png"
imgTank1.src = "tank.png"
imgTank2.src = "tank.png"
imgTank3.src = "tank.png"
imgTank4.src = "tank.png"
imgMiss.src = "miss.png"

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

//отрисовка
let xBegin = 3;
let yBegin = 43;
let step = 50;
let dist = 400;
function draw() {
    ctx.drawImage(bg, 20, 60);
    ctx.drawImage(bg, 420, 60);
    ctx.drawImage(imgTank1, xBegin + coordTankX[0], yBegin + coordTankY[0]);
    ctx.drawImage(imgTank2, xBegin + coordTankX[1], yBegin + coordTankY[1]);
    ctx.drawImage(imgTank3, xBegin + coordTankX[2], yBegin + coordTankY[2]);
    ctx.drawImage(imgTank4, xBegin + coordTankX[3], yBegin + coordTankY[3]);
    ctx.drawImage(imgMiss, xBegin + coordShotX, yBegin + coordShotY);

}
bg.onload = draw; //запуск функции после загрузки картинки

//запуск при нажатии клавиши
document.addEventListener("keydown", start, { once: true }) //once - функция исполнится 1 раз
function start() {
    var n = ctx.clearRect(15, cvs.height - 33, 380, 20); //затирание стартовой надписи
    setTimeout(() => input(0, 4, `Введите координаты танка: `), 5); //задержка, чтобы затирка стартовой надписи прошла до запуска функции
}

// массив возможных координат
let arrTank = new Array;
let arrCoord = new Array;
for (let i = 0; i < 36; i++) {
    if (i < 6) arrCoord[i] = "а" + parseInt(i + 1);
    else if (i < 12) arrCoord[i] = "б" + parseInt(i - 5);
    else if (i < 18) arrCoord[i] = "в" + parseInt(i - 11);
    else if (i < 24) arrCoord[i] = "г" + parseInt(i - 17);
    else if (i < 30) arrCoord[i] = "д" + parseInt(i - 23);
    else if (i < 36) arrCoord[i] = "е" + parseInt(i - 29);
}

var enterTank;
var arrCoordPlayer = new Array;
var arrCoordOpp = new Array;
var coordTankX = new Array;
var coordTankY = new Array;
var coordShotX;
var coordShotY;

//функция проверки ввода
function check(enter) {
    for (let j = 0; j < 36; j++) {
        if (enter === arrCoord[j]) return true;
    }
}
//функция преобразования координат расстановки
function changeCoord(enter, i) {
    if (enter[0] == "а") coordTankY[i] = step;
    else if (enter[0] == "б") coordTankY[i] = step * 2;
    else if (enter[0] == "в") coordTankY[i] = step * 3;
    else if (enter[0] == "г") coordTankY[i] = step * 4;
    else if (enter[0] == "д") coordTankY[i] = step * 5;
    else if (enter[0] == "е") coordTankY[i] = step * 6;
    if (enter[1] == "1") coordTankX[i] = step;
    else if (enter[1] == "2") coordTankX[i] = step * 2;
    else if (enter[1] == "3") coordTankX[i] = step * 3;
    else if (enter[1] == "4") coordTankX[i] = step * 4;
    else if (enter[1] == "5") coordTankX[i] = step * 5;
    else if (enter[1] == "6") coordTankX[i] = step * 6;
}

//функция преобразования координат выстрела
function changeCoordShot(enter) {
    if (enter[0] == "а") coordShotY = step;
    else if (enter[0] == "б") coordShotY = step * 2;
    else if (enter[0] == "в") coordShotY = step * 3;
    else if (enter[0] == "г") coordShotY = step * 4;
    else if (enter[0] == "д") coordShotY = step * 5;
    else if (enter[0] == "е") coordShotY = step * 6;
    if (enter[1] == "1") coordShotY = step + dist;
    else if (enter[1] == "2") coordShotX = step * 2 + dist;
    else if (enter[1] == "3") coordShotX = step * 3 + dist;
    else if (enter[1] == "4") coordShotX = step * 4 + dist;
    else if (enter[1] == "5") coordShotX = step * 5 + dist;
    else if (enter[1] == "6") coordShotX = step * 6 + dist;
}


//функция ввода
function input(id, n, text) {

    for (let i = 0; i < n; i++) {
        enter = prompt(text + parseInt(i+1), "а" + parseInt(i+1));
        let checkEnter = check(enter);
        if (checkEnter !== true) {
            alert("Нет таких координат!");
            i -= 1;
        }
        if(id==0) {
            arrCoordPlayer[i] = enter;
            changeCoord(enter, i);
            draw();
        }
        
    }
    if(id == 0) setTimeout(()=>play(),500);
    else if(id==1) return enter;
}

function play() {
    alert("begin!")
    //ctx.font = "italic 13pt Arial";
    //var textColor = "black";
    //ctx.fillStyle = textColor;
    //ctx.textAlign = "left";
    ctx.fillText("Для начала нажмите любую клавишу...", 20, cvs.height - 20);
    coordOpp();
    gunFunc()        
}

function gunFunc(){
    let shot = input(1, 1,"Введите координаты выстрела"); 
    let checkShot = checkShotFunc(shot);
    if(checkShot==true) hitFunc(shot);
    else missFunc(shot);
}


//проверка попадания
function checkShotFunc(enterShot) {
    for (let j = 0; j < 4; j++) {
        if (enterShot === arrCoordOpp[j]) return true;
    }
}

//расположение танков противника
function coordOpp() {
    for(let i=0; i<4; i++) {
    var rand = Math.floor(Math.random() * arrCoord.length) // рандомная позиция массива
    arrCoordOpp[i] = arrCoord[rand];
    }
    alert(arrCoordOpp);
} 

//попадание
var coordHit;
function hitFunc(coord) {
    changeCoordShot(coord); 
    alert(coord)
    draw();
}
//промах
var coordMiss;
function missFunc(coord) {
    changeCoordShot(coord); 
    alert(coord)
    draw();
    //setTimeout(()=>gunFunc(), 5000);
}