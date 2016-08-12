const gulp = require('gulp')

// サーバ
const browserSync = require('browser-sync')

// ファイル操作
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')

// CSS
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const uncss = require('postcss-uncss')
const cleancss = require('postcss-clean')

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

// Normalize.css更新用
gulp.task('update-normalize', () => {
  return gulp.src('node_modules/normalize.css/normalize.css')
  .pipe(gulp.dest('_src/css'))
})

// CSSの生成
gulp.task('css', () => {
  return gulp.src([
    '_src/css/normalize.css',
    '_src/css/style.css'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('style.css'))
  .pipe(postcss([
    autoprefixer({ browsers: ['last 1 version'], cascade: false }),
    uncss({ html: ['index.html'] }),
    cleancss({ keepBreaks: true, advanced: false }),
  ]))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream())
})

gulp.task('default', ['browser-sync'])