
function onInit() {
    renderImages()
}

function renderImages() {
    var images = getImages()
    var strHtml = '';
    images.forEach(function (img, idx) {
        strHtml +=
            `<div class="card">
            <img id="${img.id}" class="item-img" onclick="selectImg(this)" style="background-image: url('${img.url}');"></img>
            </div>\n`
    });
    document.querySelector('.images-container').innerHTML = strHtml
}

function findImageById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function onSearchImg() {
    renderImages()
}

function selectImg(img) {
    // localStorage.clear();
    console.log(img);
    document.querySelector('.gallery-page').hidden = true
    document.querySelector('.meme-content-background').hidden = false
    var picture = findImageById(img.id)
    initMeme(picture)
    saveCurrImg(picture);
}


function filterImages(imgs) {
    var userSearch = document.getElementById('search').value;
    if (userSearch === '') return imgs;
    else return imgs.filter(function (img) {
        return img.keywords.some(function (keyword) {
            return keyword.substring(0, userSearch.length) === userSearch;
        });
    });
}

function onLogoClick() {
    document.querySelector('.meme-page').hidden = true
    document.querySelector('.meme-content-background').hidden = true
    document.querySelector('.gallery-page').hidden = false


}
