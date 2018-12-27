const gulp = require(`gulp`);
const config = require(`./config`);

gulp.task(`copyFonts`, function () {
  return gulp.src(`${config.source.fonts}/**/*`)
    .pipe(gulp.dest(`${config.build.fonts}`));
});
