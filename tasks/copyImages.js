const gulp = require(`gulp`);
const config = require(`./config`);

gulp.task(`copyImages`, function () {
  return gulp.src(`${config.source.images}/**/*`)
    .pipe(gulp.dest(`${config.build.images}`));
});
