'use strict';

var gulp = require('gulp'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    assign = require('object-assign'),
    fs = require("fs"),
    karma = require("gulp-karma"),
    Server = require('karma').Server;

var config = JSON.parse(fs.readFileSync('.gulpconfig', "utf8"));
var plugins = require('gulp-load-plugins')(config.loadPluginsConfig);

gulp.task('watch', ['build'], function () {
    gulp.watch([config.srcAppPath + '/**/*'], ['build']);
});

gulp.task('server', ['watch'], function () {

    gulp.src(config.distPath)
        .pipe(plugins.webserver({
            livereload: true,
            directoryListing: false,
            host: config.serverHost,
            port: config.serverPort,
            open: config.serverOpen
        }));

});

gulp.task('sass', ['clean'], function () {

    if (config.sass && config.sassConfig) {

        var sassAr = [];

        config.sass.forEach(function (sass) {
            sassAr.push(sass);
        });

        return gulp.src(sassAr)
            .pipe(plugins.sass(config.sassConfig))
            .pipe(plugins.concat('scss.css'))
            .pipe(gulp.dest(config.tmpPath));

    } else {
        return;
    }
});

gulp.task('jscs', function () {
    return gulp.src(config.srcAppPath + '/**/*.js')
        .pipe(plugins.jscs());
});

gulp.task('jshint', function() {
    return gulp.src(config.srcAppPath + '/**/*.js')
        .pipe(plugins.jshint(), plugins.jshint.reporter(config.jshintReporter));
});

gulp.task('quality', ['jshint', 'jscs']);

gulp.task('clean', function () {
    return gulp.src(config.distPath + '/*')
        .pipe(vinylPaths(del));
});

gulp.task('compile', ['clean', 'sass', 'quality'], function () {

    var assets = plugins.useref.assets();

    return gulp.src(config.srcAppPath + '/**/*.html')
        .pipe(assets)
        .pipe(
            plugins.if('*.js', plugins.uglify(config.uglifyConfig))
        )
        .pipe(
            plugins.if('*.css', plugins.minifyCss(config.minifyCssConfig))
        )
        .pipe(plugins.rev())
        .pipe(assets.restore())
        .pipe(plugins.useref())
        .pipe(plugins.revReplace())
        .pipe(
            plugins.if('*.html', plugins.minifyHtml(config.minifyHtmlConfig))
        )
        .pipe(gulp.dest(config.distPath));
});

gulp.task('test', function() {
    return gulp.src([
        config.srcAppPath + '/scripts/**/*.js',
        config.testAppPath + '/unit/**/*.js'])
        .pipe(karma({
            configFile: pathToKarmaConf + '/karma.conf.js',
            singleRun: isTravis,
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

var gulp = require('gulp');
var pathToKarmaConf = __dirname.replace('/gulp', '');
var isTravis = process.env.TRAVIS || false;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: pathToKarmaConf + '/karma.conf.js',
        singleRun: isTravis
    }, done).start();
});

gulp.task('build', ['clean', 'compile']);

gulp.task('default', ['build']);
