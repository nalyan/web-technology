var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bg = new Image();
var imgTank = new Image();
bg.src = "bg.png"
imgTank.src = "tank.png"

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

//вставка полей
let xBegin = 20;
let yBegin = 60;
function draw() {
    ctx.drawImage(bg, xBegin, yBegin);
    ctx.drawImage(bg, xBegin + 400, yBegin);
    ctx.drawImage(imgTank, xBegin + coordTankX[0], yBegin + coordTankY[0]);
}
bg.onload = draw; //запуск функции после загрузки картинки

//запуск при нажатии клавиши
document.addEventListener("keydown", start, { once: true }) //once - функция исполнится 1 раз
function start() {
    var n = ctx.clearRect(15, cvs.height - 33, 380, 20); //затирание стартовой надписи
    setTimeout(() => enterTank(), 5); //задержка, чтобы затирка стартовой надписи прошла до запуска функции
}

//ввод и проверка координат игрока
let arrTank = ['а1', "а2", "а3", "а4", "а5", "а6"]
var arrEnterTank;
var coordTankX = new Array;
var coordTankY = new Array;
function enterTank() {

    for (let i = 0; i < 4; i++) {
        arrEnterTank = prompt(`Введите координаты ${i + 1} танка`, "а1");
        let check = false;
        for (let j = 0; j < 6; j++) {
            if (arrEnterTank === arrTank[j]) {
                check = true;
                alert(check)
                //break;
            }
            
        }
        if (check == false) {
            alert("Нет таких координат!");
            i -= 1;

        }
        alert(`x: ${arrEnterTank[0]} y: ${arrEnterTank[1]}`)
        if(arrEnterTank[0] == "а") coordTankX[0] = 33
        //else coordTankX[0] = 66;
        if(arrEnterTank[1] == "1") coordTankY[0] = 33 
        //else coordTankY[0] = 66;
        //alert(coordTankX + coordTankY)
        draw()
        //setTimeout(,5000);
    }
    
}



setTimeout(() => alert(coordTank), 3000);