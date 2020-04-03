const canvas = document.getElementById("js_canvas");
const paint = document.getElementById("js_fill");
const ctx = canvas.getContext("2d");
const DEFAULT_SIZE = 700;
const color = document.getElementsByClassName("colors");
const save = document.getElementById("js_save");
const clear = document.getElementById("js_clear");


canvas.width = DEFAULT_SIZE;
canvas.height = DEFAULT_SIZE;

ctx.strokeStyle = "black";
ctx.fillStyle = "white";
ctx.lineWidth = 2.5;

let fillStatus = false;
let paintStatus = false;

function stopPainting() {
    console.log("Stop Painting");
    fillStatus = false;
}

function startPainting() {
    console.log("Start Painting");
    fillStatus = true;
}

function painting(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (fillStatus) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}
function changePaint() {
    if (paintStatus) {
        paintStatus = false;
        paint.innerHTML = "Fill";
    } else {
        paintStatus = true;
        paint.innerHTML = "Paint";
    }
}

function paintCanvas() {
    console.log("Call")
    if (paintStatus) {
        ctx.fillRect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE);
    }
}
function changeColor(event) {
    const userColor = event.target.style.backgroundColor;
    ctx.strokeStyle = userColor;
    ctx.fillStyle = userColor;
}

function downloadIMG() {
    const answer = confirm("다운로드 하시겠습니까?")
    if (answer) {
        alert("명작이군요.");
        const url = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = url;
        link.download = "PaintJS";
        link.click();
    } else {
        alert("조금 더 증진하십시오.");
    }
}

function canvasClear() {
    const answer = confirm("정말로 삭제하시겠습니까? 지금까지 그린 데이터는 사라집니다.");
    if (answer) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE);
    } else {
        alert("잘 생각하셨습니다.");
    }
}

function menuDelete(event){
    event.preventDefault();
}


if (canvas) {
    canvas.addEventListener("mouseout", stopPainting);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mousemove", painting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("click", paintCanvas);
    canvas.addEventListener("contextmenu",menuDelete);
}

if (paint) {
    paint.addEventListener("click", changePaint);
}

Array.from(color).forEach(colors => colors.addEventListener("click", changeColor));

if (save) {
    save.addEventListener("click", downloadIMG);
}

if (clear) {
    clear.addEventListener("click", canvasClear);
}