const gulp = require('gulp');
const bro = require('gulp-bro');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const del = require('del');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');

const isDevelopment = process.env.NODE_ENV !== 'production';


gulp.task('views', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function () {
  return gulp.src('./src/app.js')
    .pipe(bro({
      debug: isDevelopment,
      transform: [
        babelify.configure({ presets: ['es2015'] }),
      ]
    }))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('clean', function () {
  return del('./public')
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.html', gulp.series('views'));
  gulp.watch('./src/**/*.js', gulp.series('scripts'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: './public',
    port: 8080
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'views',
    'scripts'
)));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch',
    'serve'
)));
