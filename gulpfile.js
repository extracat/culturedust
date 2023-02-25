const { src, dest, series, watch } = import('gulp')
const del = import('del')
const njk = import('gulp-nunjucks-render')
const beautify = import('gulp-beautify')

function clean() {
    return del(['dist'])
}

function html() {
    return src('src/html/*.+(html|njk|shtml)')
        .pipe(
            njk({
                path: ['src/html'],
            })
        )
        .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
        .pipe(dest('dist'))
}

function watchFiles() {
    watch('src/html/**/*', html)
}

exports.build = series(clean, html)
exports.default = series(clean, html, watchFiles)
