var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var concat = require('gulp-concat')
var autoprefixer = require('gulp-autoprefixer')
var rename = require('gulp-rename')
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
    // files: [
    //   './**/*.html',
    //   './_src/css/*.css',
    //   './_src/less/*.less',
    //   '!./node_modules/**',
    //   '!./_src/bower_components/**',
    // ],
  })
  gulp.watch('./**/*.html', reload)
})

// CSSの生成
gulp.task('css', function () {
  gulp.src(['_src/css/normalize.css', '_src/css/style.css'])
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(concat('style.css'))
  .pipe(uncss({
    html: ['index.html']
  }))
  .pipe(minifycss({ keepBreaks: true }))
  .pipe(gulp.dest('css'))

  // todo: source maps
})

var paths = {
  normalize: './_src/bower_components/normalize-css/*.css',
  jquery: './_src/bower_components/jquery/jquery.min.*',
  css: './_src/css/*.css',
}

gulp.task('default', ['browser-sync'])
