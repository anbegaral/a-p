var gulp = require('gulp'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
cleanCSS = require('gulp-clean-css'),
imageResize = require('gulp-image-resize'),
rename = require("gulp-rename"),
clean = require('gulp-clean'),
htmlmin = require('gulp-htmlmin');
browserSync = require('browser-sync').create();

// array of tasks
var resizeImageTasks = [];
// object with the sizes
var imageSizes = [
    {
        "width": 150,
        "height": 112,
        "name": "_150_small_x1"
    },
    {
        "width": 150 * 2,
        "height": 112 * 2,
        "name": "_300_small_x2"
    },
    {
        "width": 200,
        "height": 150,
        "name": "_200_medium_x1"
    },
    {
        "width": 200 * 2,
        "height": 150 * 2,
        "name": "_400_medium_x2"
    },
    {
        "width": 258,
        "height": 192,
        "name": "_258_large_x1"
    },
    {
        "width": 258 * 2,
        "height": 192 * 2,
        "name": "_516_large_x2"
    }
]
// loop to create the task for size
imageSizes.forEach(function(size) {
    // naming the tasks
    var resizeImageTask = 'resize_' + size.name;
    // creating the tasks with the values
    gulp.task(resizeImageTask, function () {
        return gulp.src('src/assets/images/*.jpg')
        .pipe(imageResize({
            width : size.width,
            height : size.height,
            crop : true,
            upscale : true,
            quality : 1,
            background: 'none'
        }))
        .pipe(rename(function (path) { path.basename += size.name; }))
        .pipe(gulp.dest('dist/assets/images'));
    });
    // adding the tasks to the array
    resizeImageTasks.push(resizeImageTask);
})
// executes the array of tasks
gulp.task('resize_images', resizeImageTasks);

gulp.task('sass', function () {
    gulp.src(['src/sass/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('dist/css/'));
});

//Task to delete the old versions of the js files
gulp.task('clean-scripts', function () {
    return gulp.src(['dist/js/*.js', 'js/*.js'], { read: false })
      .pipe(clean({ force: true }));
});

gulp.task('copy-js', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify({ 'mangle': false }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-assets', function () {
    return gulp.src('src/assets/fonts/*.*')
        .pipe(gulp.dest('dist/assets/fonts')),
    gulp.src('src/assets/images/*.{png,svg}')
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server:{
            baseDir: './dist'
        }
    });
});

gulp.task('watch', ['sass', 'copy-html', 'copy-js', 'browser-sync'], function(){
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/js/*.js', ['copy-js']);
    gulp.watch('src/**/*.js', browserSync.reload);
    
});

gulp.task('deploy', ['sass', 'clean-scripts', 'copy-js', 'copy-html', 'copy-assets']);

gulp.task('default', ['deploy']);
