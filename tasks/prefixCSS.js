const gulp = require(`gulp`);
const config = require(`./config`);
const autoprefixer = require(`gulp-autoprefixer`);

gulp.task(`prefixCSS`, function () {
  return gulp.src([`${config.build.css}/*.css`, `!${config.build.css}/*.min.css`])
    .pipe(autoprefixer({
      browsers: [`last 2 versions`],
      cascade: true
    }))
    .pipe(gulp.dest(`${config.build.css}/`));
});
