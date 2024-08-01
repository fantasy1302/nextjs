/***Общая конфигурация Webpack для режима dev и build ***/

//Подключение библиотеки Path для работы с путями
const path = require("path");
//Подключение адресов папок src и dist
const { dirs } = require("./Settings/Constants");
//Подключение самого Webpack
const webpack = require("webpack");

/** Подключение модулей Webpack ***/

//Обработка JS
const Scripts = require("./Presets/Scripts");
//Обработка Стилей Сss и Sass
const Style = require("./Presets/Style");
//Обработка Перенос изображений в папку Dist
const Images = require("./Presets/Images");
//Обработка Перенос изображений в папку Dist
const SvgSprite = require("./Presets/SvgSprite");
//Обработка Перенос изображений в папку Dist
const Fonts = require("./Presets/Fonts");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require("./Plugins/SpriteLoaderPlugin");

/** Подключение Плагинов ***/
// Плагин извлечения стилей css в отдельные файлы
const MiniCssExtractPlugin = require("./Plugins/MiniCssExtractPlugin");
// Плагин копирования файлов
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(dirs.src, "index.js"),
    gutenberg: path.join(dirs.src, "gutenberg.js"),
    //Для добавления других входных файлов добавить строчку типа
    // *название*: path.join(dirs.src, "*название*.js"),
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].min.css",
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(dirs.src, "images"),
          to: path.join(dirs.dist, "images"),
        },
        {
          from: path.join(dirs.src, "fonts"),
          to: path.join(dirs.dist, "fonts"),
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    // Убираем из работы node_modules и вводим алиасы,
    modules: ["node_modules"],
    alias: {
      "@": dirs.src,
      "@js": path.join(dirs.src, "js"),
      "@scss": path.join(dirs.src, "scss"),
      "@images": path.join(dirs.src, "images"),
      "@sprite": path.join(dirs.src, "images", "sprite"),
      "@fonts": path.join(dirs.src, "fonts"),
    },
  },
  module: {
    rules: [Scripts, Style, SvgSprite, Images, Fonts],
  },
  output: {
    path: path.join(__dirname, "../", "dist"),
    filename: "js/[name].bundle.js",
    publicPath: "auto",
    assetModuleFilename: "[path][name][ext]",
  },
};
