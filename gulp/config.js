const SOURCE_PATH = `source`; // Sources dir
const TARGET_PATH = `build`; // Target dir

const Config = {
  PRODUCTION_OPTIONS: { // Options for build
    mode: `production`, // Webpack mode
    sourceMap: false, // Build source maps for CSS and JS
    optimizeImages: true // Minify images
  },
  DEVELOPER_OPTIONS: { // Options for developing
    mode: `development`, // Webpack mode
    sourceMap: true, // Build source maps for CSS and JS
    optimizeImages: false // Minify images
  },
  SOURCE: {
    root: `${SOURCE_PATH}`,
    images: `${SOURCE_PATH}/img`,
    fonts: `${SOURCE_PATH}/fonts`,
    styles: `${SOURCE_PATH}/css`,
    scripts: `${SOURCE_PATH}/js`,
    sprite: `${SOURCE_PATH}/img/svg-sprite`,
    rawImages: `${SOURCE_PATH}/img/before-optimize`
  },
  TARGET: {
    root: `${TARGET_PATH}`,
    images: `${TARGET_PATH}/img`,
    fonts: `${TARGET_PATH}/fonts`,
    styles: `${TARGET_PATH}/css`,
    scripts: `${TARGET_PATH}/js`,
  },
  ENTRY_STYLES: `style.scss`,
  OUTPUT_STYLES: `style.min.css`,
  ENTRY_SCRIPTS: `main.js`,
  OUTPUT_SCRIPTS: `main.js`
};

module.exports = Config;
