const { src, dest, series, watch } = require('gulp')
const del = require('del')
const njk = require('gulp-nunjucks-render')
const beautify = require('gulp-beautify')

function clean() {
    return del(['build'])
}

function html() {
    return src('src/html/**/*.+(html|njk|shtml)')
        .pipe(
            njk({
                path: ['src/html'],
            })
        )
        .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
        .pipe(dest('build'))
}

function files() {
  return src('src/html/**/*.+(jpg|png|gif|txt|rtf)')
      .pipe(dest('build'))
}

function css() {
  return src('src/css/**/*.+(css)')
      .pipe(dest('build'))
}


function watchFiles() {
    watch('src/html/**/*', html)
}

exports.build = series(clean, files, css, html)
exports.default = series(clean, files, css, html, watchFiles)
