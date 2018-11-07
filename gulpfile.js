var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var clean_css = require('gulp-clean-css');
var concat = require('gulp-concat');

gulp.task('sass', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
});

gulp.task('clean_css', function(){
  return gulp.src('src/css/*.css')
    .pipe(clean_css())
    .pipe(gulp.dest('src/css'));
});


gulp.task('imagemin', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
);

gulp.task('babel', () =>
    gulp.src(['src/js/*.js'])
        .pipe(babel({
            presets: ['env']
        }))
        .on('error', function(e){
          console.log('>>>> Error', e);
          this.emit('end');
        })
        .pipe(concat('all.js'))
        .pipe(uglify('all.js'))
        .pipe(gulp.dest('src/js'))
);

gulp.task('serve', ['sass', 'clean_css', 'imagemin', 'babel'], function(){
  
  gulp.watch(['src/scss/*.scss', 'src/scss/includes/*.scss', 'src/scss/pages/*.scss', 'src/scss/components/*.scss'], ['sass', 'clean_css']);
  gulp.watch(['src/js/*.js'],['babel']);
  gulp.watch(['src/img/*'],['imagemin']);
});

gulp.task('default', ['serve']);