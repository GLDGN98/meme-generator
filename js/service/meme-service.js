


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
            posY: 65
        },
        {
            txt: '',
            order: 1,
            size: 40,
            align: 'left',
            color: 'white',
            posX: 50,
            posY: 500
        },
        {
            txt: '',
            order: 2,
            size: 40,
            align: 'left',
            color: 'white',
            posX: 50,
            posY: 240
        }
    ]
}

function changeFontSize(size, i) {
    size === 'increase' ? gMeme.lines[0].size++ : gMeme.lines[i].size--
    // renderText(size)
}

function showPlaceholder() {
    var LinePlaceholderHeight = gMeme.lines[lineIdx].posY
    var lineBreakPos = gCanvas.width - 50
    if (!gMeme.lines[lineIdx].txt) {
        gCtx.font = `${gMeme.lines[lineIdx].size}px ${gMeme.font}`
        gCtx.fillStyle = 'black'
        gCtx.fillText('Type here!', gMeme.lines[0].posX, LinePlaceholderHeight)
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
    lineIdx++
    if (lineIdx > 2) {
        lineIdx = 0
    }
    console.log(lineIdx);
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
            moveTo.posY += 10
            break;
        case 'down':
            moveTo.posY -= 10
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

// !fix aligning 
