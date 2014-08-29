var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// path stuff
require('shelljs/global');
var clean = require('gulp-clean');
var mkdirp = require('mkdirp');
var path = require('path');
var join = path.join;
var gzip = require('gulp-gzip');

// build variables
var outputFile = "vis";
var buildDir = "build";
var browserFile = "browser.js";
var browserifyOptions =  {};

// concat build variables
var outputFileSt = outputFile + ".js";
var outputFilePath = join(buildDir,outputFileSt);
var outputFileMinSt = outputFile + ".min.js";
var outputFileMin = join(buildDir,outputFileMinSt);

gulp.task('default', ['build']);
gulp.task('build', ['build-browser','build-browser-min', 'build-gzip'],function () {
  return true;
});


// browserify debug
gulp.task('build-browser',['init'], function() {
  gulp.src(outputFilePath).pipe(clean());

  dBrowserifyOptions = {};
  for( var key in browserifyOptions )
     dBrowserifyOptions[ key ] = browserifyOptions[ key ];
  dBrowserifyOptions["debug"] = true;
  return gulp.src(browserFile)
  .pipe(browserify(dBrowserifyOptions))
  .pipe(rename(outputFileSt))
  .pipe(gulp.dest(buildDir));
});

// browserify min
gulp.task('build-browser-min',['init'], function() {
  gulp.src(outputFileMin).pipe(clean());
  return mBrowserify(browserFile,outputFileMinSt);
});
 
gulp.task('build-gzip', ['build-browser','build-browser-min'], function() {
  gulp.src(outputFileMin)
    .pipe(gzip({append: false, gzipOptions: { level: 9 }}))
    .pipe(rename(outputFile + ".min.gz.js"))
    .pipe(gulp.dest(buildDir));
  return gulp.src(join(buildDir, "msa.min.css"))
    .pipe(gzip({append: false, gzipOptions: { level: 9 }}))
    .pipe(rename("msa.min.gz.css"))
    .pipe(gulp.dest(buildDir));
});


// be careful when using this task.
// will remove everything in build
gulp.task('clean', function() {
  gulp.src(buildDir).pipe(clean());
  gulp.run('init');
});

// just makes sure that the build dir exists
gulp.task('init', function() {
  mkdirp(buildDir, function (err) {
    if (err) console.error(err)
  });
});

function mBrowserify(browserFile,fileName){
  return gulp.src(browserFile)
  .pipe(browserify(browserifyOptions))
  .pipe(uglify())
  .pipe(rename(fileName))
  .pipe(gulp.dest(buildDir));
}
