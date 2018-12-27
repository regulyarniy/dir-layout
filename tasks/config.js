const sourcePath = `source`;
const buildPath = `build`;
const browserSync = require(`browser-sync`).create();

const config = {
  browserSync,
  source: {
    root: `${sourcePath}`,
    css: `${sourcePath}/css`,
    scripts: `${sourcePath}/js`,
    images: `${sourcePath}/img`,
    fonts: `${sourcePath}/fonts`
  },
  build: {
    root: `${buildPath}`,
    css: `${buildPath}/css`,
    scripts: `${buildPath}/js`,
    images: `${buildPath}/img`,
    fonts: `${buildPath}/fonts`
  }
};

module.exports = config;
