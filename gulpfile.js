const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const typescript = require('gulp-typescript')

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

gulp.task('compileTypeScript', () => {
    return gulp.src('./client/scripts/*.ts')
        .pipe(typescript({
            noImplicitAny: true
        }))
        .pipe(gulp.dest('./server/public/scripts'))
})

if (process.env.NODE_ENV !== 'production') {
    gulp.watch(['./client/css/*.css'], gulp.series('minifyCss'))
    gulp.watch(['./client/scripts/*.ts'], gulp.series('compileTypeScript'))
}