var gulp = require('gulp')

// サーバ
var browserSync = require('browser-sync')
var reload = browserSync.reload

// ファイル操作
var concat = require('gulp-concat')
var rename = require('gulp-rename')

// CSS
var autoprefixer = require('gulp-autoprefixer')
var uncss = require('gulp-uncss')
var minifycss = require('gulp-minify-css')

// サーバのセットアップ
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './',
      directory: true,
    },
    port: 50525,
    open: true,
    notify: false,
  })
  gulp.watch('./_src/**/*.css', ['css'])
  gulp.watch('./**/*.html').on('change', browserSync.reload)
})

// CSSの生成
gulp.task('css', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    '_src/css/style.css'
  ])
  .pipe(autoprefixer({
    browsers: ['last 1 version'],
    cascade: false
  }))
  .pipe(concat('style.css'))
  .pipe(uncss({ html: ['index.html'] }))
  .pipe(minifycss({ keepBreaks: true, advanced: false }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream())

  // todo: source maps
})

gulp.task('default', ['browser-sync'])