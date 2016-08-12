const gulp = require('gulp')

// サーバ
const browserSync = require('browser-sync')
const reload = browserSync.reload

// ファイル操作
const concat = require('gulp-concat')

// CSS
const autoprefixer = require('gulp-autoprefixer')
const uncss = require('gulp-uncss')
const cleancss = require('gulp-clean-css')

// サーバのセットアップ
gulp.task('browser-sync', () => {
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
gulp.task('css', () => {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    '_src/css/style.css'
  ])
  .pipe(concat('style.css'))
  .pipe(autoprefixer({
    browsers: ['last 1 version'],
    cascade: false
  }))
  .pipe(uncss({ html: ['index.html'] }))
  .pipe(cleancss({ keepBreaks: true, advanced: false }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream())

  // todo: source maps
})

gulp.task('default', ['browser-sync'])