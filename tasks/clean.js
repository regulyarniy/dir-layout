const gulp = require(`gulp`);
const config = require(`./config`);
const clean = require(`gulp-clean`);

gulp.task(`clean`, function () {
  return gulp.src(config.build.root)
      .pipe(clean());
});
