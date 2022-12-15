



function onInit() {
    renderImages()
}



function renderImages() {
    var images = getImages()
    var strHtml = '';
    images.forEach(function (img, idx) {
        strHtml +=
            `<div class="card">
            <h3>${img.name}</h3>
            <img id="${img.id}" class="item-img" onclick="selectImg(this)" style="background-image: url('${img.url}');"></img>
            <button onclick="selectImgByBtn('${img.id}')">Add Caption</button>
            </div>\n`
    });
    document.querySelector('.images-container').innerHTML = strHtml
}

function findImageById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img

}

function selectImgByBtn(id) {
    var img = findImageById(id)
    selectImg(img)
}


function selectImg(img) {
    localStorage.clear();
    console.log(img);
    const gallery = document.querySelector('.gallery').hidden = true
    var picture = findImageById(img.id)
    initMeme(picture)
    saveCurrImg(picture);
}


