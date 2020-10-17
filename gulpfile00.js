const gulp = require('gulp');
const cssmin = require('gulp-htmlmin');
const prefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const webserver = require('gulp-webserver');
const rename=require('gulp-rename');
const sass=require('gulp-sass');

const cssHandle = () => {
    return gulp.src('./src/css/*.css')
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
}

const sassHandle=()=>{
	return gulp.src('./src/sass/*.sass')
		.pipe(sass())
		.pipe(prefixer())
		.pipe(cssmin())
		.pipe(gulp.dest('./dist/css'))
}

const jsHandle = () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

const htmlHandle = () => {
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin({
            "collapseWhiteSpace": true,
            "removeAttributeQuotes": true,
            "coolapseBooleanAttributes": true,
            "removeComments": true,
            "miniJs": true,
            "minifyCss": true
        }))
        .pipe(gulp.dest('./dist/pages'))
}

const imgHandle = () => {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img'))
}

const libHandle = () => {
    return gulp.src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib'))
}

const vedioHandle = () => {
    return gulp.src('./src/vedio/**')
        .pipe(gulp.dest('./dist/vedio'))
}

const audioHandle = () => {
    return gulp.src('./src/audio/**')
        .pipe(gulp.dest('./dist/audio'))
}

const delHandle = () => {
    return del('./dist')
}

const watchHandle = () => {
    gulp.watch('./src/pages/*.html', htmlHandle)
    gulp.watch('./src/js/*.js', jsHandle)
    gulp.watch('./src/css/*.css', cssHandle)
    gulp.watch('./src/sass/*.scss', sassHandle)
    gulp.watch('./src/img/**', imgHandle)
    gulp.watch('./src/lib/**', libHandle)
    gulp.watch('./src/vedio**', vedioHandle)
    gulp.watch('./src/audio/**', audioHandle)
}

const serverHandle = () => {
    gulp.src('./dist')
        .pipe(webserver({
            port: 9999,
            open: '/pages/index.html',
            proxies: [{
                source: '/weather',
                target: "https://way.jd.com/jisuapi/weather"
            }]
        }))
}

const renHandle=()=>{
	return gulp.src('./src/txt/log.txt')
	.pipe(rename('txt/log.md'))
	.pipe(gulp.dest('./dist'))
}

module.exports.default = gulp.series(
    delHandle,
    gulp.parallel(
        htmlHandle,
        jsHandle,
        cssHandle,
        sassHandle,
        imgHandle,
        libHandle,
        audioHandle,
        vedioHandle
    ),
    renHandle,
    serverHandle,
    watchHandle
)
