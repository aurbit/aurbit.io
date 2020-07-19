require('dotenv').config()
const gulp = require('gulp')
const browserSync = require('browser-sync')
const del = require('del')
const runSequence = require('run-sequence').use(gulp)

function browserSyncTask () {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  })
}

function browserSyncReload (done) {
  browserSync.reload()
  done()
}

// Watch files
function watchFiles () {
  gulp.watch('src/**/**', browserSyncReload)
  gulp.watch('src/index.html', browserSyncReload)
}

function makeDist () {
  return gulp.src('src/**/**').pipe(gulp.dest('dist/'))
}

function cleanDist (done) {
  del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*'])
  done()
}

gulp.task('default', function (callback) {
  runSequence(['css', 'browserSync', 'watch'], callback)
})

const build = gulp.series(cleanDist, makeDist)
const watch = gulp.parallel(browserSyncTask, watchFiles)

gulp.task('build', build, done => done())
gulp.task('default', watch)
