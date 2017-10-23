'use strict';

const gulp           = require('gulp');
const pug            = require('gulp-pug');
const plumber        = require('gulp-plumber');
const config         = require('../config');
const pugIncludeGlob = require('pug-include-glob');

/**
 * Default HTML task.
 * Compile '.pug' files to '.html'.
 */
gulp.task('pug-compile', () => compileHtml('src/template/pages/*.pug', './www/'));

/**
 * Watcher HTML task.
 * Watch for changes in '.pug' files and compile them.
 */
gulp.task('pug-watch', () => {
  gulp.watch('src/template/**/*.pug', ['pug-compile']);
});

/**
 * Watch for changes in webpack-chunk-manifest file.
 * Re-compile HTML on change.
 */
gulp.task('chunk-watch', () => {
  gulp.watch('./www/webpack-chunk-manifest.json', ['pug-compile']);
});

/**
 * Set default pug options.
 *
 * @constant
 * @type {Object}
 */
const pugOptions = {
  pretty: config.production,
  nspaces: 4,
  tabs: true,
  donotencode: true,
  plugins: [ pugIncludeGlob() ]
};

/**
 * Default HTML compilation function.
 *
 * @param {String} src
 * @param {String} dest
 */
function compileHtml(src, dest) {
  pugOptions.data = {
    webpackManifest: require(config.chunkManifestPath)
  };

  return gulp.src([src])
    .pipe(plumber(config.plumberOptions))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(dest));
}