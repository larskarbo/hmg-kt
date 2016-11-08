var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify')

var sassFiles = ['./sass/**/*.scss'];


gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});

gulp.task('sass', function(done) {
    gulp.src('./sass/**.scss')
    .pipe(sass({ errLogToConsole: true}))
    .pipe(sourcemaps.init())
    //.pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))

    .on('end', done)
});

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});
