var gulp = require ("gulp"),
browserSync = require ("browser-sync"),
sass = require ("gulp-sass"),
concat = require ("gulp-concat"),
autoprefixer = require ("gulp-autoprefixer"),
sourcemaps = require("gulp-sourcemaps"),
babel = require("gulp-babel");

//
// GULP WATCH
//
// GULP BUILD
//
// GULP CLEAR
//

//     ES6 INTEGRATION
gulp.task("default", function () {
    return gulp.src("app/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/js"));
});
//      SASS INTEGRATION
gulp.task ('sass', function() {
  return gulp.src ('app/scss/**/*.scss')
  .pipe (sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe (gulp.dest('app/css'))
  .pipe (browserSync.reload({stream: true}))
});

gulp.task ('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "app/",
      index: "index.html"
    },
    notify: false
  });
});

gulp.task ('watch', ['browser-sync'], function() {
  gulp.watch ('app/scss/**/*.scss', ['sass']);
  gulp.watch ('app/*.html', browserSync.reload);
  gulp.watch ('app/js/**/*.js', browserSync.reload);
});
