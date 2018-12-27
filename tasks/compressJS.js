const gulp = require(`gulp`);
const config = require(`./config`);
const uglify = require(`gulp-uglify`);
const pump = require(`pump`);
const rename = require(`gulp-rename`);

gulp.task(`compressJS`, function (cb) {
  pump([
    gulp.src(`${config.source.scripts}/*.js`),
    rename({
      dirname: `${config.build.scripts}`,
      suffix: `.min`
    }),
    uglify(),
    gulp.dest(`./`),
    config.browserSync.stream()
  ],
  cb
  );
});
