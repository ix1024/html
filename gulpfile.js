const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync');

const { series, watch, parallel } = require('gulp');

// `less` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function buildLess() {

  return gulp.src(['./less/**/*.less', '!./less/common/**/*.less'])
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./temp/css'))
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function css() {
  return gulp.src('./temp/css/**/*.css')
    .pipe(postcss())
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('./html/css'))
}

var files = [
  'html/**/*.*',
  'css/**/*.css',
  'javascript/*.js'
];
browserSync.init(files, {
  server: {//开启一个静态文件服务器，默认：3000端口
    baseDir: ['html']
  },
}, function (err, bs) {
  console.log(bs.options.getIn(["urls", "local"]));
});

watch(['less/**/*.less'], series(buildLess, css));

// exports.css = css;
exports.default = series(buildLess, css);