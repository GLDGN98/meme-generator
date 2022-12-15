'use strict'


let gImgs;

createImages()



function getImages() {
    return gImgs
}


function createImages() {
    gImgs = []
    gImgs.push(
        _createImage('little girl', './images/1.jpg', ['funny']),
        _createImage('little boy', './images/2.jpg', ['funny']),
        _createImage('mad cat', './images/3.jpg', ['animal']),
        _createImage('little girl', './images/4.jpg', ['funny']),
        _createImage('little girl', './images/5.jpg', ['funny']),
        _createImage('little girl', './images/6.jpg', ['funny']),
        _createImage('little girl', './images/7.jpg', ['funny']),
        _createImage('little girl', './images/8.jpg', ['funny']),
        _createImage('little girl', './images/9.jpg', ['funny']),
        _createImage('little girl', './images/10.jpg', ['funny']),
        _createImage('little girl', './images/11.jpg', ['funny']),
        _createImage('little girl', './images/12.jpg', ['funny']),
        _createImage('little girl', './images/13.jpg', ['funny']),
        _createImage('little girl', './images/14.jpg', ['funny']),
        _createImage('little girl', './images/15.jpg', ['funny']),
        _createImage('little girl', './images/16.jpg', ['funny']),
        _createImage('little girl', './images/17.jpg', ['funny']),
        _createImage('little girl', './images/18.jpg', ['funny']),
    )
}


function _createImage(name, url, keywords) {
    return {
        id: makeId(),
        name,
        url,
        keywords
    }
}


console.log(gImgs);
