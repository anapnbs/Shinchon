const gulp = require('gulp');
const imagemin = require('gulp-imageMin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');


// Log Message
gulp.task('message', function(){
	return console.log('Gulp is running...');
});

// Optimize Images
gulp.task('imageMin', function(){
	gulp.src(['src/img/*', 'src/img/*/*'])
		.pipe(imagemin())
		.pipe(gulp.dest('assets/img'))
});

// Compile Sass
gulp.task('sass', function(){
	gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/sass/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'))
});

// Minify & Rename CSS and Move to assets/css
gulp.task('styles', function(){
	gulp.src(['src/css/*.css', '!src/css/style.css', '!src/css/*.min.css'])
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('assets/css')),
	gulp.src(['node_modules/font-awesome/css/font-awesome.min.css', 'src/css/*.min.css', 'src/css/style.css'])
		.pipe(gulp.dest('assets/css'))
});

// Minify & Rename JS and Move to assets/js
gulp.task('scripts', function(){
	gulp.src(['src/js/*.js', '!src/js/*.min.js'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('assets/js'))
	gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'src/js/*.min.js', 'src/js/*/*.js'])
		.pipe(gulp.dest('assets/js'))
});

// Move Fonts
gulp.task('fonts', function(){
	gulp.src(['node_modules/font-awesome/fonts/*', 'src/fonts/*', 'src/fonts/*/*'])
		.pipe(gulp.dest('assets/fonts'))
});

// Default & Watch
gulp.task('watch', function(){
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/css/*.css', ['styles']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/img/*', ['imageMin']);
	gulp.watch('src/fonts/*', ['fonts']);
});

gulp.task('default', ['message', 'imageMin', 'sass', 'styles', 'scripts', 'fonts', 'watch']);

