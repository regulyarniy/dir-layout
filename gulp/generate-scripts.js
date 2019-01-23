const {src, dest} = require(`gulp`);
const plumber = require(`gulp-plumber`);
const webpack = require(`webpack-stream`);
const named = require(`vinyl-named`);
const {SOURCE, TARGET, ENTRY_SCRIPTS, OUTPUT_SCRIPTS} = require(`./config`);

const generateScripts = (options) => {
  return function _generateScripts() {
    return src(`${SOURCE.scripts}/${ENTRY_SCRIPTS}`)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack({
      mode: options.mode,
      output: {filename: `${OUTPUT_SCRIPTS}`},
      devtool: options.sourceMap && `source-map`,
      stats: `errors-only`,
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: `babel-loader`,
              options: {
                presets: [`@babel/preset-env`]
              }
            }
          }
        ]
      },
    }))
    .pipe(dest(`${TARGET.scripts}`));
  };
};

module.exports = generateScripts;
