const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

export function newer(src, dest) {
  return src.pipe($.newer(dest));
}

export function source(src) {
  return src.pipe ? src : gulp.src(src);
}

export function wrap(fn){
  var output = function(src, dest){
    return function(){
      return fn(source(src), dest)
        .pipe(gulp.dest(dest));
    };
  };
  output.stream = fn;
  return output;
}

export function createBuildAndWatchTasks(buildTasks){
  /* Build everything */
  gulp.task('build', buildTasks.map(t => t.name));

  /* Watch for individual file changes and build as needed */
  gulp.task('watch', ['build'], function(){
    buildTasks.forEach(t => gulp.watch(t.pattern, [t.name]));
  });
}

export function checkProductionMode(){
  // Detect environment
  return process.env.NODE_ENV === 'production';
}