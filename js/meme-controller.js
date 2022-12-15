var gCanvas;
var gCtx
var gCurrImg
var IMG_KEY = 'currImg';
var lineIdx = 0


function initMeme(img) {
    document.querySelector('.meme-canvas').hidden = false
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gCurrImg = img
    renderCanvasImage()
}

function drawImage(imgCanvas) {
    var x = 0;
    var y = 0;
    gCtx.drawImage(imgCanvas, x, y, gCanvas.width, gCanvas.height);

}

function renderCanvasImage() {
    var imgCanvas = new Image();
    imgCanvas.src = gCurrImg.url;
    console.log(lineIdx);

    // 40 10
    imgCanvas.onload = function () {
        drawImage(this);
        showPlaceholder()

        renderText()
    };
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderText() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        var textWidth = gCtx.measureText(gMeme.lines[i].txt).width += gMeme.lines[i].posX;
        console.log(textWidth);

        if (textWidth > 500) {
            document.querySelector('.meme-txt').disabled = true
        }
        // if (textWidth < 500) {
        //     document.querySelector('.meme-txt').disabled = false

        // }
        var { posX, posY } = txtPos(i)
        gCtx.font = `${gMeme.lines[i].size}px ${gMeme.font}`
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = gMeme.lines[i].color
        gCtx.fillText(gMeme.lines[i].txt, posX, posY)
        gCtx.strokeText(gMeme.lines[i].txt, posX, posY);
        gCtx.save()

    }
}

function onChangeFont() {
    var elFont = document.querySelector('.select-font').value;
    gMeme.font = elFont;
    renderCanvasImage();
}

function onMoveText(val) {
    moveText(val)
    renderCanvasImage()

}

function onAddLine() {
    lineIdx++
    document.querySelector('.meme-txt').value = ''
    console.log(gMeme);
    if (lineIdx > 2) return

    // addLine(lineIdx)
}

function onTxtInput(value) {
    txtInput(value, lineIdx)
    renderCanvasImage()
}

function onSwitchLine() {
    switchLine()
}

function onDeleteLine() {
    document.querySelector('.meme-txt').value = ''
    deleteLine()
    renderText();
    renderCanvasImage();
}

function selectedLine() {
    gCtx.rect(gMeme.lines[lineIdx].posX - 10, gMeme.lines[lineIdx].posY - 55, 500, 90);
    gCtx.stroke()
}
//! make the prev selected line dissapear after switching lines

function onColorChange(color) {
    txtColorChange(color, lineIdx)
    renderCanvasImage()
}

function onChangeFontSize(size) {
    changeFontSize(size, lineIdx)
    renderCanvasImage()
}

function saveCurrImg(img) {
    saveToStorage(IMG_KEY, img);
}

function getCurrImg() {
    var currImg = loadFromStorage(IMG_KEY);
    return currImg;
}

function onAlignText(align) {
    alignText(align, lineIdx)
    renderCanvasImage()
}

function downloadImg(elImg) {
    var currImg = gCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    elImg.href = currImg;
}
