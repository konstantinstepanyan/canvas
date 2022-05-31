let gulp = require("gulp"),
  log = require("fancy-log"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  minify = require("gulp-minify"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  gcmq = require("gulp-group-css-media-queries"),
  webp = require("gulp-webp"),
  debug = require('gulp-debug');

//log('Hello, Terminal!');

gulp.task("clean", async function () {
  del.sync("dist");
});

gulp.task("pug", function () {
  //return gulp.src('dev/pug/*.pug')

  return gulp
    .src("dev/pug/index.pug")
    .pipe(
      pug({
        doctype: "html",
        pretty: false,
      })
    )
    .pipe(gulp.dest("production/"));
});

gulp.task("scss", function () {
  return gulp
    .src("dev/scss/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )

    .pipe(
      autoprefixer({
        cascade: false,
      })
    )

    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )

    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gcmq())



    .pipe(gulp.dest("production/css"));

  //        .pipe(browserSync.reload({
  //            stream: true
  //        }))
});

gulp.task("gcmq", function () {
  return gulp
    .src("production/css/*.css")
    .pipe(gcmq())
    .pipe(gulp.dest("production/css/dist/"));
});

gulp.task("toWebp", () => {
  // './dev/img/**/*.{png,gif,jpg}' - все файлы в img и все файлы в подпапках в img

  log("webp task");

  return gulp.src('./dev/img/**/*.{png,gif,jpg}')
    .pipe(webp())
    .pipe(rename({ prefix: 'webp/' }))
    .pipe(gulp.dest('./dev/img'));

  return;
});


gulp.task("copyImages", function () {
  return gulp.src("dev/img/**")
    .pipe(gulp.dest("production/img"));

  return;
});

gulp.task("copyFonts", function () {
  return gulp.src("dev/fonts/**").pipe(gulp.dest("production/fonts"));
});

gulp.task("html", function () {
  return gulp.src("production/*.html");
  //        .pipe(browserSync.reload({
  //            stream: true
  //        }))
});

gulp.task("script", function () {
  return gulp.src("dev/js/*.js").pipe(gulp.dest("production/js"));
  //        .pipe(browserSync.reload({
  //            stream: true
  //        }))
});

gulp.task("min-js", function () {
  return gulp
    .src("dev/js/**")
    .pipe(
      minify({
        ext: {
          min: ".js",
        },
        noSource: true,
      })
    )
    .pipe(gulp.dest("production/js"));
});

//gulp.task('browser-sync', function () {
//    browserSync.init({
//        server: {
//            baseDir: "dev/"
//        }
//    });
//});


gulp.task("export", function () {
  let buildHtml = gulp.src("production/*.html").pipe(gulp.dest("dist"));

  let BuildCss = gulp.src("dev/css/**/*.css").pipe(gulp.dest("dist/css"));

  let BuildJs = gulp.src("dev/js/**/*.js").pipe(gulp.dest("dist/js"));

  let BuildFonts = gulp.src("dev/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));

  let BuildImg = gulp.src("dev/img/**/*.*").pipe(gulp.dest("dist/img"));
});

gulp.task("watch", function () {
  gulp.watch("dev/pug/**/*.pug", gulp.series("pug"));
  gulp.watch("dev/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("dev/*.html", gulp.series("html"));
  gulp.watch("./dev/img/**/*.{png,gif,jpg}", gulp.series("toWebp"));
  gulp.watch("./dev/img/**/*", gulp.series("copyImages"));
  gulp.watch("dev/fonts/**", gulp.series("copyFonts"));
  gulp.watch("dev/js/*.js", gulp.series("min-js"));
});

gulp.task("build", gulp.series("clean", "export"));

//gulp.task('default', gulp.parallel('pug', 'scss', 'css', 'js', 'browser-sync', 'watch'));
gulp.task(
  "default",
  gulp.series(
    "pug",
    "scss",
    "toWebp",
    "copyImages",
    "copyFonts",
    "min-js",
    "watch"
  )
);
