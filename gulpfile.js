const {task, series, parallel} = require(`gulp`);
const {
  Config,
  clean,
  copyAssets,
  generateSVG,
  generateWEBP,
  minifyImages,
  generateHtml,
  generateCSS,
  generateScripts,
  Server,
  watchFiles,
  cleanImages
} = require(`./gulp`);

const {PRODUCTION_OPTIONS, DEVELOPER_OPTIONS} = Config;

task(`build`, series(
    clean,
    cleanImages,
    generateSVG,
    generateWEBP,
    minifyImages(PRODUCTION_OPTIONS),
    copyAssets,
    generateHtml,
    generateCSS(PRODUCTION_OPTIONS),
    generateScripts(PRODUCTION_OPTIONS)
));

const server = new Server();
task(`start`, series(
    clean,
    cleanImages,
    generateSVG,
    generateWEBP,
    minifyImages(DEVELOPER_OPTIONS),
    copyAssets,
    generateHtml,
    generateCSS(DEVELOPER_OPTIONS),
    generateScripts(DEVELOPER_OPTIONS),
    parallel(server.init.bind(server), watchFiles(DEVELOPER_OPTIONS))
));
