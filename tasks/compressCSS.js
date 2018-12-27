const gulp = require(`gulp`);
const config = require(`./config`);
const cssnano = require(`gulp-cssnano`);
const rename = require(`gulp-rename`);

gulp.task(`compressCSS`, function () {
  return gulp.src([`${config.build.css}/*.css`, `!${config.build.css}/*.min.css`])
    .pipe(rename({
      dirname: `${config.build.css}/`,
      suffix: `.min`
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(`./`));
});
