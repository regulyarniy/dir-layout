const gulp = require(`gulp`);
const config = require(`./config`);

gulp.task(`watch`, [`browserSync`, `build`], function () {
  gulp.watch(`${config.source.css}/*.scss`, [`postCSS`]);
  gulp.watch(`${config.source.root}/**/*.*`, [`copy`]);
  gulp.watch(`${config.source.scripts}/*.js`, [`scripts`]);
});
