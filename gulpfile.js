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
  browserSync({
    server: {
      baseDir: './',
      directory: true,
    },
    port: 50525,
    open: true,
    notify: false,
  })
  gulp.watch(['./**/*.html', './css/*.css'], reload)
  gulp.watch('./_src/**/*.css', ['css'])
})

// CSSの生成
gulp.task('css', function () {
  gulp.src([
    '_src/bower_components/normalize-css/normalize.css',
    '_src/css/style.css'
    ])
  .pipe(autoprefixer({
    browsers: ['last 1 version'],
    cascade: false
  }))
  .pipe(concat('style.css'))
  .pipe(uncss({
    html: ['index.html']
  }))
  .pipe(minifycss({ keepBreaks: true, advanced: false }))
  .pipe(gulp.dest('css'))

  // todo: source maps
})

gulp.task('default', ['browser-sync'])