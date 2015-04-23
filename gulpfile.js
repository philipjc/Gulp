var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var minhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var reload = require('gulp-livereload');

// Directory Paths
var src = 'public/src';
var dist = 'public/dist';
var paths = {
  js: src + '/js/*.js',
  scss: src + '/scss/*.scss',
  html: src + '/*.html'
};

gulp.task('server', function () {
  return gulp.src(dist + '/')
  .pipe(webserver());
});

gulp.task('js-scripts', function () {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    // .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(dist + '/js'));
});

gulp.task('compile-sass', function () {
  return gulp.src(paths.scss)
  .pipe(sass())
  .pipe(gulp.dest(dist + '/'));
});

gulp.task('min-html', function () {
  return gulp.src(paths.html)
    .pipe(minhtml())
    .pipe(gulp.dest(dist + '/'));
});

gulp.task('watch', function () {
  reload.listen();
  gulp.watch(paths.js, ['js-scripts']);
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.html, ['min-html']);
  gulp.watch(dist + '/**').on('change', reload.changed);
});

gulp.task('default', [
  'server', 'js-scripts',
  'compile-sass', 'min-html',
  'watch' ]);
