const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile Sass for all projects
function style() {
  return gulp.src('*/assets/styles/main-styles.scss') // Glob pattern to target each project's main SCSS file
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest((file) => file.base)) // Output CSS in the same `assets/styles` folder for each project
	.pipe(browserSync.stream());
}

// BrowserSync task
function browsersync() {
  browserSync.init({
	server: {
	  baseDir: './' // Adjust if your HTML is in a different directory
	}
  });

  // Watch for SCSS changes in any project’s assets folder
  gulp.watch('*/assets/styles/**/*.scss', style); // Adjust this if other SCSS files are in subdirectories within styles
  gulp.watch('*.html').on('change', browserSync.reload); // Watch for HTML changes in the root
  gulp.watch('*/**/*.html').on('change', browserSync.reload); // Watch for HTML changes in project subdirectories
}

// Export browsersync as the default task
exports.default = gulp.series(style, browsersync);
exports.browsersync = browsersync; // Now you can run `gulp browsersync`
