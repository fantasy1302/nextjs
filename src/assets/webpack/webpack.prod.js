const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
          new TerserPlugin(),
          new CssMinimizerPlugin(),
          new ImageminWebpWebpackPlugin({
            config: [{
                      test: /\.(jpe?g|png)/,
                      exclude: ["src/img/favicon"],
                      options: {
                          quality: 80
                      }
                  }]
          }),
          new ImageMinimizerPlugin({
            minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
              ],
            },
          }
          })
      ],
  },
});