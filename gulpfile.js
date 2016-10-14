const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const browserify = require('gulp-browserify');
const babelify = require('babelify');

gulp.task('babel', function () {
  return gulp.src('./app/babel/main.js')
    .pipe(browserify({
      transform: ['babelify'],
      extensions: ['.js']
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function() {
    return gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function(){
    return gulp.src('dist',{read: false})
    .pipe(clean())
})

gulp.task('serve', ['sass','babel'], function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/babel/*.js', ['babel']).on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('gulpfile.js').on('change', browserSync.reload);
})

gulp.task('default', ['serve']);