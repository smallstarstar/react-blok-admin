const gulp = require('gulp');
const rename = require('gulp-rename');
const mergeJson = require('gulp-merge-json');
const clean = require('gulp-clean');

gulp.task('cleanJson', function () {
    return gulp.src('src/languages/en')
        .pipe(clean()) 
})

gulp.task('jsonEn', function () {
    return gulp.src('src/*/**/en.json')
        .pipe(mergeJson())
        .pipe(rename('EN.json'))
        .pipe(gulp.dest('src/languages/en'))
});

gulp.task('jsonCn', function () {
    return gulp.src('src/*/**/cn.json')
        .pipe(mergeJson())
        .pipe(rename('CN.json'))
        .pipe(gulp.dest('src/languages/cn'))
});

gulp.task('default', gulp.series('cleanJson', 'jsonEn', 'jsonCn')); 