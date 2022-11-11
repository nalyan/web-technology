var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bg = new Image();
var imgTank1 = new Image();
var imgTank2 = new Image();
var imgTank3 = new Image();
var imgTank4 = new Image();
var imgTank5 = new Image();
var imgTank6 = new Image();
bg.src = "bg.png"
imgTank1.src = "tank.png"
imgTank2.src = "tank.png"
imgTank3.src = "tank.png"
imgTank4.src = "tank.png"
imgTank5.src = "tank.png"
imgTank6.src = "tank.png"

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
//var textColor = "black";
//ctx.fillStyle = textColor;
ctx.textAlign = "left";
ctx.fillText("поле игрока", 50, cvs.height - 95);
ctx.fillText("поле противника", 450, cvs.height - 95);

//вставка полей
let xBegin = 3;
let yBegin = 43;
let step = 50;
function draw() {
    ctx.drawImage(bg, 20, 60);
    ctx.drawImage(bg, 420, 60);
    ctx.drawImage(imgTank1, xBegin + coordTankX[0], yBegin + coordTankY[0]);
    ctx.drawImage(imgTank2, xBegin + coordTankX[1], yBegin + coordTankY[1]);
    ctx.drawImage(imgTank3, xBegin + coordTankX[2], yBegin + coordTankY[2]);
    ctx.drawImage(imgTank4, xBegin + coordTankX[3], yBegin + coordTankY[3]);
    ctx.drawImage(imgTank5, xBegin + coordTankX[4], yBegin + coordTankY[4]);
    ctx.drawImage(imgTank6, xBegin + coordTankX[5], yBegin + coordTankY[5]);
}
imgTank6.onload = draw; //запуск функции после загрузки картинки

//запуск при нажатии клавиши
document.addEventListener("keydown", start, { once: true }) //once - функция исполнится 1 раз
function start() {
    var n = ctx.clearRect(15, cvs.height - 33, 380, 20); //затирание стартовой надписи
    setTimeout(() => enterTank(), 5); //задержка, чтобы затирка стартовой надписи прошла до запуска функции
}

//ввод и проверка координат игрока
let arrTank = new Array;
for (let i = 0; i < 36; i++) {
    if(i<6) arrTank[i]="а"+parseInt(i+1);
    else if(i<12) arrTank[i]="б"+parseInt(i-5);
    else if(i<18) arrTank[i]="в"+parseInt(i-11);
    else if(i<24) arrTank[i]="г"+parseInt(i-17);
    else if(i<30) arrTank[i]="д"+parseInt(i-23);
    else if(i<36) arrTank[i]="е"+parseInt(i-29);
}
var enterTank;
var coordTankX = new Array;
var coordTankY = new Array;
function enterTank() {

    for (let i = 0; i < 4; i++) {
        enterTank = prompt(`Введите координаты ${i + 1} танка`, "а1");
        let check = false;
        for (let j = 0; j < 36; j++) {
            if (enterTank === arrTank[j]) {
                check = true;
                break;
            }
        }
        if (check == false) {
            alert("Нет таких координат!");
            i -= 1;
        }
        if (enterTank[0] == "а") coordTankX[i] = step;
        else if (enterTank[0] == "б") coordTankX[i] = step * 2;
        else if (enterTank[0] == "в") coordTankX[i] = step * 3;
        else if (enterTank[0] == "г") coordTankX[i] = step * 4;
        else if (enterTank[0] == "д") coordTankX[i] = step * 5;
        else if (enterTank[0] == "е") coordTankX[i] = step * 6;
        if (enterTank[1] == "1") coordTankY[i] = step;
        else if (enterTank[1] == "2") coordTankY[i] = step * 2;
        else if (enterTank[1] == "3") coordTankY[i] = step * 3;
        else if (enterTank[1] == "4") coordTankY[i] = step * 4;
        else if (enterTank[1] == "5") coordTankY[i] = step * 5;
        else if (enterTank[1] == "6") coordTankY[i] = step * 6;

    }
    draw()
    //alert(coordTankX)
    //alert(coordTankY)


}
