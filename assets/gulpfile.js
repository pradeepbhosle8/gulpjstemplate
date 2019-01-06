/* Varables Decleartion */
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();



/* gulp tasks */

// compiler sass files to stylesheet
gulp.task('sass', function() {
	return gulp.src('src/sass/*.scss')
		   .pipe(sass())
		   .pipe(cleanCSS({compatibility: 'ie8'}))
		   .pipe(gulp.dest('dist/css'))	
		   .pipe(browserSync.stream());
});

// Minify JavaScript 
gulp.task('minify-js', function() {
	return gulp.src('src/js/*.js')
		   .pipe(uglify())
		   .pipe(concat('app.js'))
		   .pipe(gulp.dest('dist/js'))
});

// images minify 
gulp.task('image-mini', function() {
	return gulp.src('src/img/*')
		   .pipe(imagemin())
		   .pipe(gulp.dest('dist/images'))
});

// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
        server: {
            baseDir: "../"
        }
    });
    gulp.watch("src/sass/*.scss", gulp.series('sass')) ;
    gulp.watch("../*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'minify-js', 'image-mini', 'browser-sync'));


