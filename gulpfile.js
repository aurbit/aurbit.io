require('dotenv').config()
const gulp = require('gulp')
const browserSync = require('browser-sync')
const del = require('del')
const runSequence = require('run-sequence').use(gulp)
const sass = require('gulp-sass')

sass.compiler = require('node-sass')

function browserSyncTask () {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  })
}

function browserSyncReload (done) {
  browserSync.reload(done())
}

// Watch files
function watchFiles () {
  gulp.watch('src/scss/app.scss', buildSass)
  gulp.watch(['src/**/**', '!src/scss/app.scss'], browserSyncReload)
  gulp.watch('src/index.html', browserSyncReload)
}

function makeDist () {
  return gulp.src('src/**/**').pipe(gulp.dest('dist/'))
}

function cleanDist (done) {
  del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*'])
  done()
}

function buildSass (done) {
  del.sync(['src/css/app.css'])
  gulp
    .src('src/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'), browserSyncReload, done())
}

gulp.task('default', function (callback) {
  runSequence(['css', 'browserSync', 'watch'], callback)
})

const build = gulp.series(buildSass, cleanDist, makeDist)
const watch = gulp.parallel(buildSass, browserSyncTask, watchFiles)

gulp.task('build', build, done => done())
gulp.task('default', watch)
