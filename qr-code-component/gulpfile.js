const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile Sass
function style() {
	return gulp.src('styles/main-styles.scss') // Adjust path if necessary
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('styles')) // Output directory for compiled CSS
		.pipe(browserSync.stream());
}

// Watch for changes
function watch() {
	gulp.watch('styles/**/*.scss', style); // Watch for SCSS changes
	gulp.watch('*.html').on('change', browserSync.reload); // Watch for HTML changes
}

// BrowserSync task
function browsersync() {
	browserSync.init({
		server: {
			baseDir: './' // Adjust if your HTML is in a different directory
		}
	});
	watch(); // Start watching for changes
}

// Define default task
exports.default = gulp.series(style, browsersync);
exports.browsersync = browsersync; // Export the browsersync task
