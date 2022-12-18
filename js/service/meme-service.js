var emojis;
var AddedToFav = false
var gCurrUploadedImg;
var gStartPos;

var gMeme = {
    selectedImgId: 5, // get the id from the image
    selectedLineIdx: 0, // starts from the first line whos going to appear on top
    font: 'Impact',
    lines: [
        {
            txt: '',
            order: 0,
            size: 40,
            align: 'left',
            color: 'white',
            posX: 50,
            posY: 70,
            isDrag: false

        },
        {
            txt: '',
            order: 1,
            size: 40,
            align: 'left',
            color: 'white',
            posX: 50,
            posY: 500,
            isDrag: false

        },
        {
            txt: '',
            order: 2,
            size: 40,
            align: 'left',
            color: 'white',
            posX: 50,
            posY: 240,
            isDrag: false

        }
    ]
}

function getEmojis() {
    emojis = ["😁", "🤣", "😎", "😑", "😯", "🥱", "😴", "😌", "😛", "😮", "🤨", "😲", "🤯", "😤", "🤓"]
    var startIdx = gEmojiPageIdx * EMOJI_COUNT
    return emojis.slice(startIdx, startIdx + EMOJI_COUNT)
}

function changeFontSize(size, i) {
    size === 'increase' ? gMeme.lines[i].size++ : gMeme.lines[i].size--
    // renderText(size)
}

function showPlaceholder() {
    if (lineIdx > 2) {
        return lineIdx = 0
    }
    var LinePlaceholderHeight = gMeme.lines[lineIdx].posY
    var lineBreakPos = gCanvas.width - 50
    if (!gMeme.lines[lineIdx].txt) {
        gCtx.font = '40px Impact'
        gCtx.fillStyle = 'white'
        gCtx.strokeStyle = 'black'
        gCtx.fillText('Type here!', gMeme.lines[lineIdx].posX, LinePlaceholderHeight)
        gCtx.strokeText('Type here!', gMeme.lines[lineIdx].posX, LinePlaceholderHeight)
    }
}

function txtColorChange(color, i) {
    var fontColor = gMeme.lines[i].color = color
    renderText(color)
    return fontColor
}

function deleteLine() {
    gMeme.lines[lineIdx].txt = '';
}

function txtPos(i) {
    const { posX, posY } = gMeme.lines[i]
    return { posX, posY };
}

function txtInput(value, i) {
    gMeme.lines[i].txt = value
    // renderText(value)
}

function switchLine() {

    if (lineIdx === 2 || !gMeme.lines[lineIdx + 1].txt) {
        return lineIdx = 0

    }
    lineIdx++
    document.querySelector('.meme-txt').value = gMeme.lines[lineIdx].txt
    showPlaceholder()
}

function moveText(val) {
    var moveTo = gMeme.lines[lineIdx]
    switch (val) {
        case 'right':
            moveTo.posX += 5
            break;
        case 'left':
            moveTo.posX -= 5
            break;
        case 'up':
            moveTo.posY -= 10
            break;
        case 'down':
            moveTo.posY += 10
            break;
        default:
            return
    }
}

function alignText(align, i) {
    var selectedTextAlign = gMeme.lines[i].align
    var alignTo = gMeme.lines[i]
    selectedTextAlign = align
    switch (align) {
        case 'center':
            alignTo.posX = gCanvas.width / 2 - 50;
            break;
        case 'left':
            alignTo.posX = 10;
            break;
        case 'right':
            alignTo.posX = 400;
            break;
    }



    // if (align === 'center') {
    //     gMeme.lines[i].posX = gCanvas.width / 2 - 50;
    // }
    // if (align === 'left') {
    //     gMeme.lines[i].posX = 10;
    // }
    // if (align === 'right') {
    //     gMeme.lines[i].posX = 400;
    // }
    // renderText(align)
}

function onDeleteSavedMeme(memeId) {
    var pickedMeme = savedMeme.findIndex(meme => memeId === meme.id)
    savedMeme.splice(pickedMeme, 1)
    saveToStorage('myFavMemes', savedMeme)
    renderSavedMemes()
}

function saveCurrImg(img) {
    saveToStorage(IMG_KEY, img);
}

function getCurrImg() {
    var currImg = loadFromStorage(IMG_KEY);
    return currImg;
}

function downloadImg(elImg) {
    var currImg = gCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    elImg.href = currImg;
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    selectLineByClick(x, y)
}

function changeEmojiPage(val) {
    if (val === 1) {
        gEmojiPageIdx++
    }
    if (val === -1) {
        gEmojiPageIdx--
    }
    if (gEmojiPageIdx > emojis.length / EMOJI_COUNT) {
        gEmojiPageIdx = 1
    }
}

function showCurrentLine(i) {
    if (!AddedToFav) {
        if (i === lineIdx) {
            gCtx.strokeStyle = 'white'
            gCtx.strokeRect(gMeme.lines[lineIdx].posX - 500, gMeme.lines[lineIdx].posY - 65, 2000, 100)
        } else return
    } {
        return
    }
}

function onUploadImg() {
    const imgDataUrl = gCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function setLineDrag(isDrag) {
    gMeme.lines[lineIdx].isDrag = isDrag
}

function isLineClicked(clickedPos) {
    const { posX, posY } = gMeme.lines[lineIdx]
    // 50 65
    var pos = { posX, posY }
    const distance = Math.sqrt((posX - clickedPos.x) ** 2 + (posY - clickedPos.y) ** 2)
    var pos = { posX, posY }
    return distance <= posX, posY
}

function moveLine(dx, dy) {
    gMeme.lines[lineIdx].posX += dx
    gMeme.lines[lineIdx].posY += dy

}

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

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    return pos
}

function resetgMeme() {
    for (var i = 0; i < 3; i++) {
        console.log(i);
        gMeme.lines[i].txt = ''
        lineIdx = 0
        document.querySelector('.meme-txt').value = ''
        gMeme.lines[0].posY = 70
        gMeme.lines[0].posX = 50
    }
}








// ! show current line
// ! fix emoji
// ! add navbar
// ! fix drag and drop