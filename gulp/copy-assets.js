const {src, dest} = require(`gulp`);
const {SOURCE, TARGET} = require(`./config`);

const copyAssets = () => {
  return src([
    `${SOURCE.fonts}/**/*.{woff,woff2}`,
    `${SOURCE.images}/*.{jpg,jpeg,png,webp,svg}`,
  ],
  {base: `source/`})
    .pipe(dest(`${TARGET.root}`));
};

module.exports = copyAssets;
