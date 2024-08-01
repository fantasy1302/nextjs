/**
 * This package allows you to wrap JavaScript files with Babel and webpack.
 *
 * @return {Object} Config
 * @see https://webpack.js.org/loaders/babel-loader/
 */

module.exports = {
    loader: "babel-loader",
    options: {
        presets: ['@babel/preset-env'],
        // plugins: ['@babel/plugin-transform-runtime'],
        // sourceType: 'unambiguous',
    }
}