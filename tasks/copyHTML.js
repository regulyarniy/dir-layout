const gulp = require(`gulp`);
const config = require(`./config`);

gulp.task(`copyHTML`, function () {
  return gulp.src(`${config.source.root}/**/*.html`)
    .pipe(gulp.dest(`${config.build.root}`));
});
