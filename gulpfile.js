const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('minifyCss', () => {
    return gulp.src('./client/css/*.css')
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            browsers: [
                'last 2 versions',
                '> 1%',
                'maintained node versions',
                'not dead'
            ],
        }))
        .pipe(gulp.dest('./server/public/css'))
})

gulp.task('moveJavaScript', () => {
    return gulp.src('./client/scripts/*.js')
        .pipe(gulp.dest('./server/public/scripts'))
})

if (process.env.NODE_ENV !== 'production') {
    gulp.watch(['./client/css/*.css'], gulp.series('minifyCss'))
    gulp.watch(['./client/scripts/*.js'], gulp.series('moveJavaScript'))
}