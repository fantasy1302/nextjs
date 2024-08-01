const path = require("path");

module.exports = {
    dirs: {
        src: path.join(__dirname, "../", "../", "src"),
        dist: path.join(__dirname, "../", "../", "dist"),
        php: path.join(__dirname, "../", "../", "../"),
        jsurl: path.join(__dirname, "../", "../", "dist/js"),
        cssurl: path.join(__dirname, "../", "../", "dist/css"),
    }
}