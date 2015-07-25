// @file stylus.js
var gulp = require('gulp');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var config = require('../config').less;

gulp.task('less', function () {
console.log(config.src);
  
    gulp.src(config.src)
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(concat(config.output))
      .pipe(gulpif(config.minify, minify()))
      .pipe(gulp.dest(config.dest));
});