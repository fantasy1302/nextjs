/***Dev конфигурация Webpack ***/

//Соединение dev и общей конфигурации
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

//Подключение стандартной библиотеки для работы с файловыми путями
const path = require('path')

//Подключение BrowserSyncPlugin для виртуального сервера
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

//Подключение пути к локальному сайту WP
const config = require("./Settings/config");
const { dirs } = require('./Settings/Constants.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new BrowserSyncPlugin(
      {
          host: "localhost",
          port: 3000,
          proxy: config.devUrl, // YOUR DEV-SERVER URL (FOUND IN CONFIG)
          files: [
              path.join(__dirname, "dist/css/*.css"),
              path.join(__dirname, "dist/js/*.js"),
          ],
      },
      {
          reload: true,
          injectChanges: false,
      }
  ),
  ]

});