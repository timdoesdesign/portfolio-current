const {src, dest, watch, series, parallel} = require('gulp'),
sass = require('gulp-sass'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssnano = require('cssnano'),
mq = require('postcss-combine-media-query'),
sourcemaps = require('gulp-sourcemaps'),
browserSync = require('browser-sync').create();

const files = {
  scssPath: 'src/scss/**/*.scss'
}

function scssTask(){
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano(), mq()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function reload(){
  browserSync.reload();
}

function watchTask(){
  browserSync.init({
    server: './dist'
  });

  watch(files.scssPath, scssTask);
  watch('dist/*.html').on('change', browserSync.reload);
}

exports.default = series(
  scssTask,
  watchTask
);
