const gulp = require(`gulp`);
const config = require(`./config`);
const sass = require(`gulp-sass`);

gulp.task(`sass`, function () {
  return gulp.src(`${config.source.css}/**/*.scss`)
    .pipe(sass.sync().on(`error`, sass.logError))
    .pipe(gulp.dest(`${config.build.css}`));
});
