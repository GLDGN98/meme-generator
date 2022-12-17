'use strict'


let gImgs;

createImages()

function getImages() {
    var imgs = filterImages(gImgs)
    return imgs
}

function createImages() {
    gImgs = []
    gImgs.push(
        _createImage('./images/1.jpg', ['tramp', 'politics', 'famous']),
        _createImage('./images/2.jpg', ['puppy', 'dog', 'animal']),
        _createImage('./images/3.jpg', ['baby', 'puppy', 'dog', 'animal']),
        _createImage('./images/4.jpg', ['cat', 'animal']),
        _createImage('./images/5.jpg', ['funny', 'baby']),
        _createImage('./images/6.jpg', ['akward']),
        _createImage('./images/7.jpg', ['baby', 'funny']),
        _createImage('./images/8.jpg', ['akward']),
        _createImage('./images/9.jpg', ['baby', 'funny', 'evil']),
        _createImage('./images/10.jpg', ['funny', 'politics', 'obama']),
        _createImage('./images/11.jpg', ['akward']),
        _createImage('./images/12.jpg', ['actor', 'famous']),
        _createImage('./images/13.jpg', ['actor', 'famous']),
        _createImage('./images/14.jpg', ['matrix', 'actor', 'famous']),
        _createImage('./images/15.jpg', ['actor', 'famous']),
        _createImage('./images/16.jpg', ['funny', 'actor', 'akward', 'famous']),
        _createImage('./images/17.jpg', ['politics', 'putin', 'famous']),
        _createImage('./images/18.jpg', ['funny', 'tv', 'famous']),
    )
}

function _createImage(url, keywords) {
    return {
        id: makeId(),
        url,
        keywords
    }
}



