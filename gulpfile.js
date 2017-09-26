// node中引入各种包的语法是require("包的名字")
var gulp = require("gulp");
// 引入css压缩包
var cssnano = require("gulp-cssnano");
// 引入js压缩包
var uglify = require("gulp-uglify");
// 引入js/css合并包
var concat = require("gulp-concat");
// 引入html压缩包
var htmlmin = require("gulp-htmlmin");
// 引入图片压缩包
var imagemin = require("gulp-imagemin");
// 引入浏览器同步模块的包
var browserSync = require("browser-sync").create();
// 创建浏览器同步加载的对象模块
var reload = browserSync.reload;

// 创建任务 压缩css
gulp.task("cssmin",function () {
  // gulp的src()方法用来找到需要操作的文件的源文件地址
  gulp.src("./src/css/base.css")
    // 压缩css文件操作
    .pipe(cssnano())
    .pipe(gulp.dest("./dist/css"))
    .pipe(reload({stream:true}))

});

// 创建任务合并js，然后再压缩js
gulp.task("jsmin",function () {
  // 将不同目录下的js文件合并到一起，然后再压缩
  gulp.src(["./src/js/*.js","./src/views/**/*.js"])
    .pipe(concat("all.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
    .pipe(reload({stream:true}))
});

// 创建任务 压缩html
gulp.task("htmlmin",function () {
  gulp.src("./src/index.html")
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest("./dist"))
    .pipe(reload({stream:true}));

  gulp.src("./src/views/**/*.html")
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest("./dist/views"))
    .pipe(reload({stream:true}))
});

// 创建任务 压缩图片
// 图片压缩环节出错，为什么？？？
// gulp.task("imagemin",function () {
//   gulp.src("./src/images/1.jpg")
//     .pipe(imagemin())
//     .pipe(gulp.dest("./dist/images"))
//     .pipe(reload({stream:true}))
// });

// 创建默认任务，依赖于上面的任务
gulp.task("default",["cssmin","jsmin","htmlmin"],function () {

  browserSync.init({
    server:{
      baseDir:"./"
    }
  });

  gulp.watch(["./src/css/*.css","./src/js/*.js","./src/views/**/*.js","./src/index.html","./src/views/**/*.html"],["cssmin","jsmin","htmlmin"])

});