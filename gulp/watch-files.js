const {watch, series} = require(`gulp`);
const generateCSS = require(`./generate-css`);
const generateScripts = require(`./generate-scripts`);
const generateHtml = require(`./generate-html`);
const copyAssets = require(`./copy-assets`);
const generateSVG = require(`./generate-svg`);
const generateWEBP = require(`./generate-webp`);
const minifyImages = require(`./minify-images`);
const {SOURCE} = require(`./config`);

const watchFiles = (options) => {
  return function _watchFiles() {
    watch(`${SOURCE.styles}/**/*.scss`, generateCSS(options));
    watch(`${SOURCE.scripts}/**/*.js`, generateScripts(options));
    watch(`${SOURCE.root}/**/*.html`, generateHtml);
    watch(`${SOURCE.sprite}/*.svg`, series(generateSVG, copyAssets));
    watch(`${SOURCE.rawImages}/*.{png,jpg,svg,jpeg}`, series(generateWEBP, minifyImages(options), copyAssets));
    watch(`${SOURCE.fonts}/**/*.{woff,woff2}`, copyAssets);
  };
};

module.exports = watchFiles;
