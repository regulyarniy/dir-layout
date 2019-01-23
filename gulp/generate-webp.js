const {src, dest} = require(`gulp`);
const webp = require(`gulp-webp`);
const {SOURCE} = require(`./config`);

const generateWEBP = () => {
  return src(`${SOURCE.rawImages}/*.{png,jpg,svg}`)
    .pipe(webp({quality: 90}))
    .pipe(dest(`${SOURCE.images}`));
};

module.exports = generateWEBP;
