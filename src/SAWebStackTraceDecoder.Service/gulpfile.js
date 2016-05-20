'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var ts = require('gulp-typescript');

gulp.task('less', function ()
{
    console.log('Rebuilding less...');

    return gulp.src('./Styles/**/*.less')
        .pipe(less())
        .pipe(concat('style.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./Content'));
});

gulp.task('ts', function ()
{
    console.log('Minifying ts...');

    return gulp.src(
        [
        './Scripts/Wrapper.ts',
        './Scripts/Ajax.ts',
        './Scripts/Decoder.ts'
        ])
        .pipe(ts())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./Content'));

});

gulp.task('all', ['less', 'ts']);