var gCanvas;
var gCtx
var gCurrImg
var IMG_KEY = 'currImg';
var lineIdx = 0
var savedMeme = []
var myCanvasImage
var gCurrEmoji = {
    emoji: null,
    posX: 250,
    poxY: 250,
    font: '100px serif',
}
var emojis;
var gEmojiPageIdx = 0
const EMOJI_COUNT = 3
var gCurrUploadedImg;

// ! fix selectLine
// ! fix the emojis
// ! make a line-break

function renderSavedMemes() {
    var strHtml = '';
    var images = loadFromStorage('myFavMemes')

    images.forEach(img => {
        strHtml +=
            `<div class="fav-image-card">
            <img class="favorite-images" src='${img.img}'></img>
            <button onclick="onDeleteSavedMeme('${img.id}')" class="delete-fav-image">Delete</button>
            </div>\n`

    });

    document.querySelector('.fav-meme-images').innerHTML = strHtml

}

function renderCanvasImage() {

    var imgCanvas = new Image();
    if (gCurrUploadedImg) {
        imgCanvas.src = gCurrUploadedImg.src
    } else imgCanvas.src = gCurrImg.url;
    renderEmoji()
    imgCanvas.onload = function () {

        drawImage(this);
        showPlaceholder()
        renderText()

    };

}

function getEmojis() {
    emojis = ["😁", "🤣", "😎", "😑", "😯", "🥱", "😴", "😌", "😛", "😮", "🤨", "😲", "🤯", "😤", "🤓"]
    var startIdx = gEmojiPageIdx * EMOJI_COUNT
    return emojis.slice(startIdx, startIdx + EMOJI_COUNT)
}

function renderEmoji() {
    emojis = getEmojis()
    var strHtml = '<span onclick="onChangeEmojiPage(-1)" class="prev-page">◀</span>';

    emojis.forEach(emoji => {
        strHtml +=
            `<div>
        <span onclick="addEmoji(this)" class="emoji-picker">${emoji}</span>
            </div>`

    });
    strHtml += '<span onclick="onChangeEmojiPage(1)" class="next-page">▶</span>'

    document.querySelector('.emoji-line').innerHTML = strHtml
}

function addEmoji(ev) {
    var selectedEmoji = ev.innerText

    // use these alignment properties for "better" positioning
    gCtx.font = '100px serif'
    gCtx.textAlign = "center";
    gCtx.textBaseline = "middle";
    gCtx.fillText(selectedEmoji, 250, 250)
    gCurrEmoji.emoji = selectedEmoji
    // draw the emoji
}

function onChangeEmojiPage(val) {
    console.log(gEmojiPageIdx);


    if (val === 1) {
        gEmojiPageIdx++
    }
    if (val === -1) {
        gEmojiPageIdx--
    }
    if (gEmojiPageIdx > emojis.length / EMOJI_COUNT) {
        gEmojiPageIdx = 1
    }
    renderCanvasImage()

}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    selectLineByClick(x, y)
}

const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(canvas, e)
})

function selectLineByClick(x, y) {
    for (let i = 0; i < gMeme.lines.length; i++) {
        if (y + 30 > gMeme.lines[i].posY && y - 30 < gMeme.lines[i].posY) {
            lineIdx = i
            document.querySelector('.meme-txt').value = gMeme.lines[i].txt
        }
    }
}



// function selectedLine(i) {
//     gCtx.rect(gMeme.lines[lineIdx].posX - 10, gMeme.lines[lineIdx].posY - 55, 500, 90);
//     gCtx.stroke()
// }

function initMeme(img) {
    document.querySelector('.meme-canvas').hidden = false
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gCurrImg = img
    renderCanvasImage()
}

function renderText() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        var textWidth = gCtx.measureText(gMeme.lines[i].txt).width += gMeme.lines[i].posX;
        const textEditor = document.querySelector('.meme-txt')
        document.querySelector('.meme-txt')
        if (gCurrEmoji.emoji !== null) {
            gCtx.font = `${gCurrEmoji.font}`
            gCtx.fillText(gCurrEmoji.emoji, gCurrEmoji.posX || 250, gCurrEmoji.posY || 250)
        }
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

function onSaveMeme() {
    var myFavMemes = loadFromStorage('myFavMemes')
    savedMeme = myFavMemes
    savedMeme.push({ img: gCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"), id: makeId() });
    saveToStorage('myFavMemes', savedMeme)
    console.log(savedMeme);

}

function onOpenMemePage() {
    document.querySelector('.gallery-page').hidden = true
    const memeEditor = document.querySelector('.meme-content-background').hidden = true
    document.querySelector('.meme-page').hidden = false
    renderSavedMemes()


}

function onMoveText(val) {
    moveText(val)
    renderCanvasImage()

}

function onAddLine() {
    lineIdx++
    showPlaceholder()
    renderCanvasImage()
    document.querySelector('.meme-txt').value = ''
    console.log(gMeme);
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

//! make the prev selected line dissapear after switching lines

function onColorChange(color) {
    txtColorChange(color, lineIdx)
    renderCanvasImage()
}

function onChangeFontSize(size) {
    changeFontSize(size, lineIdx)
    renderCanvasImage()
}


function onAlignText(align) {
    alignText(align, lineIdx)
    renderCanvasImage()
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImage)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function renderImage(img) {
    console.log(img);
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    gCurrUploadedImg = img
    document.querySelector('.gallery-page').hidden = true
    document.querySelector('.meme-content-background').hidden = false
    document.querySelector('.meme-canvas').hidden = false
}

function resizeCanvas() {
    // const elContainer = document.querySelector('.canvas-container')
    // // Note: changing the canvas dimension this way clears the canvas
    // gElCanvas.width = elContainer.offsetWidth - 20
    // // Unless needed, better keep height fixed.
    // // gElCanvas.height = elContainer.offsetHeight


}

