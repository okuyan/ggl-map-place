// @file watch.js
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config').watch;

gulp.task('watch', function () {
  //js
  watch(config.js, function () {
    gulp.start(['webpack']);
  });

  //less
  watch(config.less, function () {
    gulp.start(['less']);
  });

  //www
  watch(config.www, function () {
    gulp.start(['copy']);
  });
});