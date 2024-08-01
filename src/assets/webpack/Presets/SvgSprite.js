const SvgoLoader = require("../Loaders/SvgoLoader");
const SvgTransformLoader = require("../Loaders/SvgTransformLoader");
const SvgSpriteLoader = require("../Loaders/SvgSpriteLoader");
//Подключение библиотеки Path для работы с путями
const path = require('path');

module.exports = {
    test: /\.svg$/,
    include: /sprite/,
    use: [
        SvgSpriteLoader,
        SvgTransformLoader,
        SvgoLoader,
    ]
}
