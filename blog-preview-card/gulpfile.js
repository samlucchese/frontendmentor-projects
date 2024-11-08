const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Sass task
function style() {
	return gulp.src('styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('styles'))
		.pipe(browserSync.stream());
}

// BrowserSync
function browsersync() {
	browserSync.init({
		server: {
			baseDir: './'
		},
	});

	gulp.watch('styles/*.scss', style);
	gulp.watch('*.html').on('change', browserSync.reload);
}

// Define tasks
exports.style = style;
exports.browsersync = browsersync;

