/**
 * Loads a Sass/SCSS file and compiles it to CSS.
 *
 * @return {Object} Config
 * @see https://webpack.js.org/loaders/sass-loader/
 */

module.exports = {
    loader: 'sass-loader',
    options: {
        sassOptions: {
            indentWidth: 4,
            outputStyle: 'compressed',
            // outputStyle: 'expanded',
        },
        sourceMap: true,
    },
}