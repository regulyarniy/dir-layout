const gulp = require(`gulp`);
const config = require(`./config`);
const uglify = require(`gulp-uglify`);
const plumber = require(`gulp-plumber`);
const rollup = require(`gulp-better-rollup`);
const resolve = require(`rollup-plugin-node-resolve`);
const sourcemaps = require(`gulp-sourcemaps`);
const commonjs = require(`rollup-plugin-commonjs`);
const babel = require(`rollup-plugin-babel`);

gulp.task(`scripts`, () => {
  return gulp.src(`${config.source.scripts}/main.js`).
  pipe(plumber()).
  pipe(sourcemaps.init()).
  pipe(rollup({
    plugins: [
      resolve({browser: true}),
      commonjs(),
      babel({
        babelrc: false,
        exclude: `node_modules/**`,
        presets: [`@babel/env`]
      })
    ]
  }, `iife`)).
  pipe(uglify()).
  pipe(sourcemaps.write(``)).
  pipe(gulp.dest(`${config.build.scripts}`));
});
