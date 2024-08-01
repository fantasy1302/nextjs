//Подключение Babel для обработки js файлов
const BabelLoader = require("../Loaders/BabelLoader");

module.exports = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: [
        BabelLoader
    ]
}