const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile Sass for all projects
function style() {
  return gulp.src('*/styles/main-styles.scss') // Target main-styles.scss in each project’s styles folder
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest((file) => file.base)) // Output CSS to the same folder as the SCSS file
	.pipe(browserSync.stream());
}

// BrowserSync task
function browsersync() {
  browserSync.init({
	server: {
	  baseDir: './' // Serve from root; adjust if necessary
	}
  });

  // Watch for SCSS changes in each project's styles folder
  gulp.watch('*/styles/**/*.scss', style); // Watch all SCSS files in any project's styles folder
  gulp.watch('*.html').on('change', browserSync.reload); // Watch for HTML changes in the root
  gulp.watch('*/**/*.html').on('change', browserSync.reload); // Watch for HTML changes in project subdirectories
}

// Export browsersync as the default task
exports.default = gulp.series(style, browsersync);
exports.browsersync = browsersync; // Run with `gulp browsersync`
