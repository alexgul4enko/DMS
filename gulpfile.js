var gulp = require('gulp');

gulp.task('copCSS', function () {
    gulp.src('./client/css/*')
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('copyHTML', function () {
    gulp.src('./client/*.html')
        .pipe(gulp.dest('./dist/'));
});


gulp.task('copfiles', function () {
    gulp.src('./client/files/*')
        .pipe(gulp.dest('./dist/files'));
});

gulp.task('copfonts', function () {
    gulp.src('./client/fonts/google/*')
        .pipe(gulp.dest('./dist/fonts/google'));
});


gulp.task('default', ['copCSS', 'copfiles','copfonts','copyHTML']);