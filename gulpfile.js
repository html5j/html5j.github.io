var gulp = require('gulp');
var concatwithmap = require('gulp-concat-sourcemap');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var connect = require('gulp-connect');
var clean = require('gulp-clean');

var paths = {
	normalize: './_src/bower_components/normalize-css/*.css',
	jquery: './_src/bower_components/jquery/jquery.min.*',
	css: './_src/css/*.css',
}

gulp.task('css', ['clean-css'], function (done) {
	gulp.src(paths.normalize)
		.pipe(gulp.dest('./_src/css/'))
		.on('end', function () {
			gulp.src(['./_src/css/normalize.css', './_src/css/style.css'])
				.pipe(concatwithmap('style.css'))
				.pipe(autoprefixer('last 1 version'))
				.pipe(minifycss({ keepBreaks: true }))
				.pipe(gulp.dest('./css/'))
				.pipe(connect.reload())
				.on('end', done);
		})
});

gulp.task('clean-css', function () {
	return gulp.src(['./css/*'], { read: false })
		.pipe(clean())
});

gulp.task('connect', function () {
	connect.server({ livereload: true });
});

gulp.task('html', function () {
	gulp.src(['./**/*.html', '!./node_modules/**', '!./_src/bower_components/**'])
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./**/*.html', '!./node_modules/**', '!./_src/bower_components/**'], ['html']);
	gulp.watch(['./_src/css/*.css'], ['css']);
	gulp.watch(['./_src/less/*.less'], ['css']);
});

gulp.task('default', ['connect', 'watch']);