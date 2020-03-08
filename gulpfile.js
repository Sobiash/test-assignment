
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const pngQuint = require('imagemin-pngquant');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const jpgRecompress = require('imagemin-jpeg-recompress');
const clean = require('gulp-clean');



var paths = {
  root: {
    www: './public'
  },
  src: {
    root: 'public/assets',
    html: 'public/**/*.html',
    css: 'public/assets/css/*.css',
    js: 'public/assets/js/*.js',
    images: 'public/assets/images/**/*.+(png|jpg|gif|svg)',
    scss: 'public/assets/scss/**/*.scss'
  },
  dist: {
    root: 'public/dist',
    css: 'public/dist/css',
    js: 'public/dist/js',
    images: 'public/dist/images',
  }
}


gulp.task('sass', function () {
  return gulp.src(paths.src.scss)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.src.root + '/css'))
    .pipe(browserSync.stream());
});


gulp.task('css', function () {
  return gulp.src(paths.src.css)
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(concat('app.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.css))
});


gulp.task('js', function () {
  return gulp.src(paths.src.js)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
});


gulp.task('images', function () {
  return gulp.src(paths.src.images)
    .pipe(imageMin([
      imageMin.gifsicle(),
      imageMin.jpegtran(),
      imageMin.optipng(),
      imageMin.svgo(),
      pngQuint(),
      jpgRecompress()
    ]))
    .pipe(gulp.dest(paths.dist.images));
});





gulp.task('clean', function () {
  return gulp.src(paths.dist.root)
    .pipe(clean());
});



gulp.task('build', gulp.series('sass', 'css', 'js', 'images'));



gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: paths.root.www
    }
  })

  gulp.watch(paths.src.scss, gulp.series('sass'));
  gulp.watch(paths.src.css, gulp.series('css'));
  gulp.watch(paths.src.js, gulp.series('js'));
  gulp.watch(paths.src.html).on('change', browserSync.reload);
});