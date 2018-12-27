const gulp = require(`gulp`);
const {browserSync, build} = require(`./config`);

gulp.task(`browserSync`, function () {
  browserSync.init({
    server: {
      baseDir: build.root
    },
  });
});
