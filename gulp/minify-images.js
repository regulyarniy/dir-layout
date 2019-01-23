const {src, dest} = require(`gulp`);
const imagemin = require(`gulp-imagemin`);
const empty = require(`gulp-empty-pipe`);
const {SOURCE} = require(`./config`);

const minifyImages = (options) => {
  return () => {
    return src(`${SOURCE.rawImages}/*.{png,jpg,svg}`)
    .pipe(options.optimizeImages
      && imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ])
      || empty())
    .pipe(dest(`${SOURCE.images}`));
  };
};

module.exports = minifyImages;
