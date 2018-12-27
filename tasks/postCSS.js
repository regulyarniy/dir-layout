const gulp = require(`gulp`);
const runSequence = require(`run-sequence`);
const {browserSync} = require(`./config`);

gulp.task(`postCSS`, function () {
  runSequence(`sass`, `prefixCSS`, `compressCSS`, browserSync.reload);
});
