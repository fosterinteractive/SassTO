'use strict';

var config       = require('../config');
if(!config.tasks.svgSprite){return;}

var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var imagemin     = require('gulp-imagemin');
var svgStore     = require('gulp-svgstore');
var gzip         = require('gulp-gzip');
var del          = require('del');
var path         = require('path');
var getFolders   = require('../lib/getFolders');
var rename       = require('gulp-rename');
var sizeReport   = require('gulp-sizereport');

var settings = {
  src: config.tasks.svgSprite.src + '/**/*.svg',
  dest: config.tasks.svgSprite.dest,
  imageminSettings: config.tasks.svgSprite.imageminSettings,
  reportEnabled: config.tasks.svgSprite.sizeReport.enabled,
  reportSettings: config.tasks.svgSprite.sizeReport.settings,
};

// Step 1 - Clean out old sprites icons
// (in case you've deleted some icons in your source files)

gulp.task('svgClean', function() {
  return del(settings.dest + "/**");
});

// Step 2 - Minify and copy to new location
gulp.task('svgMinify', ['svgClean'], function() {

return gulp.src(settings.src)
  .pipe(imagemin(settings.imageminSettings))
  .pipe(gulp.dest(settings.dest) // write all the minified svg to dest.
  );
});




// Step 3 - Sprite Minified files
// Each sub-folder's content becomes a single SVG sprite
// in the root dest folder

gulp.task('createSprites', ['svgMinify'], function(){

  // Get the folders in the dest
  var spriteFolders = getFolders(settings.dest);

  // Contents of each folder will get converted to a single sprite
  // spriteFolders.map - executes the function once per folder, and returns the async stream
  var buildSprites = spriteFolders.map(function(folder) {

    var src = path.join(settings.dest, folder, '/**/*.svg');

    return gulp.src(src)
      .pipe(svgStore())
      .pipe(gulp.dest(settings.dest));
  });
});

// Step 4 - Test to make sure they're not too big

gulp.task('svgSprite', ['createSprites'], function(){

  return gulp.src(settings.dest + '/*.svg')
  .pipe(gulpIf(settings.reportEnabled,
      sizeReport(settings.reportSettings)
    )
  );
});
