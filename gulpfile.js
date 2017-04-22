var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify'),
    gp_rename = require('gulp-rename');

gulp.task('vendors-js', function(){
  return gulp.src(
      ['node_modules/jquery/dist/jquery.js', 
      'node_modules/bootstrap/dist/js/bootstrap.js', 
      'node_modules/amcharts/dist/amcharts/amcharts.js', 
      'node_modules/amcharts/dist/amcharts/serial.js', 
      'node_modules/amcharts/dist/amcharts/themes/light.js', 
      'node_modules/jquery.easing/jquery.easing.js', 
      'vendor/typedjs/typed.js'
    ])
    .pipe(gp_concat('vendors.bundle.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gp_rename('vendors.bundle.min.js'))    
    .pipe(gp_uglify())
    .pipe(gulp.dest('dist/js'))
});
gulp.task('app-js', function(){
  return gulp.src(
      ['js/contact_me.js', 
      'js/jqBootstrapValidation.js', 
      'js//app.js'
    ])
    .pipe(gp_concat('app.bundle.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gp_rename('app.bundle.min.js'))    
    .pipe(gp_uglify())
    .pipe(gulp.dest('dist/js'))
});
gulp.task('default', [ 'vendors-js', 'app-js']);