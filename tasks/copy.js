const gulp = require(`gulp`);
const runSequence = require(`run-sequence`);
const {browserSync} = require(`./config`);

gulp.task(`copy`, function () {
  runSequence(`copyHTML`, `copyImages`, `copyFonts`, browserSync.reload);
});
