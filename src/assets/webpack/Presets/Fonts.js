module.exports = {
    test: /\.(woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource',
    use: {
        loader: 'url-loader',
      },
}