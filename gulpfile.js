var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');

gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});

gulp.task('styles', function() {
    gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('lint', function() {
  return gulp.src('./routes/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});