const {src, dest} = require(`gulp`);
const svgmin = require(`gulp-svgmin`);
const svgstore = require(`gulp-svgstore`);
const path = require(`path`);
const rename = require(`gulp-rename`);
const {SOURCE} = require(`./config`);

const generateSVG = () => {
  return src(`${SOURCE.sprite}/*.svg`)
    .pipe(svgmin((file) => {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + `-`,
            minify: true
          }
        }]
      };
    }))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename(`sprite.svg`))
    .pipe(dest(`${SOURCE.images}`));
};

module.exports = generateSVG;
