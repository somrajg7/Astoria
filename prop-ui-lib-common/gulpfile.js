var babel = require('gulp-babel');
var del = require('del');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var gulp = require('gulp');
var isparta = require('isparta');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nsp = require('gulp-nsp');
var path = require('path');
var plumber = require('gulp-plumber');
var sequence = require('run-sequence');

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register');

gulp.task('eslint', function() {
  return gulp.src('./src/**/*.js').pipe(excludeGitignore()).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError());
});

gulp.task('copy-static', function() {
  return gulp.src(['./LICENSE', './package.json', './README.md']).pipe(gulp.dest('./build/dist'));
});

gulp.task('copy-assets', function() {
  return gulp.src([
    './src/assets/**', './src/cbdata/**'
  ], {base: './src'}).pipe(gulp.dest('./build/dist'));
});

gulp.task('nsp', function(cb) {
  nsp({
    package: path.resolve('package.json')
  }, cb);
});

gulp.task('pre-test', function() {
  return gulp.src('./src/**/*.js').pipe(excludeGitignore()).pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter})).pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function(cb) {
  var mochaErr;

  gulp.src('./test/**/*.js').pipe(plumber()).pipe(mocha({reporter: 'spec'})).on('error', function(err) {
    mochaErr = err;
  }).pipe(istanbul.writeReports()).on('end', function() {
    cb(mochaErr);
  });
});

gulp.task('watch', function() {
  gulp.watch([
    './src/**/*.js', './test/**'
  ], ['test']);
});

gulp.task('babel', function() {
  return gulp.src([
    './src/**/*.js', './src/bin/*'
  ], {base: './src'}).pipe(babel({compact: false})).pipe(gulp.dest('./build/dist'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('default', function(callback) {
  sequence('eslint', 'test', callback);
});

gulp.task('prepublish', function(callback) {
  sequence('nsp', 'babel', 'copy-static', 'copy-assets', callback);
});
