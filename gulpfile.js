'use strict';

// modules
var _ = require('lodash');
var browserSync = require('browser-sync').create();
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');


// configuration
var config = {
	dev: gutil.env.dev,
	src: {
		scripts: './public/toolkit/scripts/toolkit.js',
		styles: './public/toolkit/styles/toolkit.scss',
		images: './public/toolkit/images/**/*'
	},
	dest: 'dist'
};


// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);


// clean
gulp.task('clean', function (cb) {
	del([config.dest + '/toolkit'], cb);
});


// config fractal

const path = require('path');
const fractal = module.exports = require('@frctl/fractal').create();

fractal.set('project.title', 'DAHLIA Pattern Library');
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.docs.set('path', path.join(__dirname, 'docs'));
fractal.web.set('static.path', path.join(__dirname, config.dest));
fractal.components.set('default.preview', '@preview');
const logger = fractal.cli.console;
const hbs = require('@frctl/handlebars')({
    helpers: {
		default: function (value, defaultValue) {
			return value ? value : defaultValue;
		},
		compare: function (lvalue, operator, rvalue, options) {
			var operators, result;

			if (arguments.length < 3) {
				throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
			}

			if (options === undefined) {
				options = rvalue;
				rvalue = operator;
				operator = "===";
			}

			operators = {
				'==': function (l, r) { return l == r; },
				'===': function (l, r) { return l === r; },
				'!=': function (l, r) { return l != r; },
				'!==': function (l, r) { return l !== r; },
				'<': function (l, r) { return l < r; },
				'>': function (l, r) { return l > r; },
				'<=': function (l, r) { return l <= r; },
				'>=': function (l, r) { return l >= r; },
				'typeof': function (l, r) { return typeof l == r; }
			};

			if (!operators[operator]) {
				throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
			}

			result = operators[operator](lvalue, rvalue);

			if (result) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}

		},
		attr: function(value) {
			return _.kebabCase(value);
		},
		lowercase: function(str) {
			if (str && typeof str === 'string') {
				return str.toLowerCase();
			} else {
				return '';
    		}
		}
	}
});
fractal.components.engine(hbs);
fractal.components.set('ext', '.html');

gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});


// styles

gulp.task('styles:toolkit', function () {
	gulp.src(config.src.styles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix('IE 9', 'last 4 versions'))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest + '/toolkit/styles'))
		.pipe(gulpif(config.dev, reload({stream:true})));
});

gulp.task('styles', ['styles:toolkit']);


// scripts
gulp.task('scripts', function (done) {
	webpackCompiler.run(function (error, result) {
		if (error) {
			gutil.log(gutil.colors.red(error));
		}
		result = result.toJson();
		if (result.errors.length) {
			result.errors.forEach(function (error) {
				gutil.log(gutil.colors.red(error));
			});
		}
		done();
	});
	gulp.src(config.src.scripts)
		.pipe(gulp.dest(config.dest + '/toolkit/scripts'))
		.pipe(gulpif(config.dev, reload({stream:true})));
});


// images
gulp.task('images', ['favicon'], function () {
	return gulp.src(config.src.images)
		.pipe(imagemin())
		.pipe(gulp.dest(config.dest + '/toolkit/images'));
});


gulp.task('favicon', function () {
	return gulp.src('./public/favicon.ico')
		.pipe(gulp.dest(config.dest));
});


// server
gulp.task('serve', function () {

	/**
	 * Because webpackCompiler.watch() isn't being used
	 * manually remove the changed file path from the cache
	 */
	function webpackCache(e) {
		var keys = Object.keys(webpackConfig.cache);
		var key, matchedKey;
		for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			key = keys[keyIndex];
			if (key.indexOf(e.path) !== -1) {
				matchedKey = key;
				break;
			}
		}
		if (matchedKey) {
			delete webpackConfig.cache[matchedKey];
		}
	}

	gulp.task('styles:toolkit:watch', ['styles:toolkit']);
	gulp.watch('./public/toolkit/styles/**/*.scss', ['styles:toolkit:watch']);

	gulp.task('scripts:watch', ['scripts'], reload);
	gulp.watch('./public/toolkit/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);

	gulp.task('images:watch', ['images'], reload);
	gulp.watch(config.src.images, ['images:watch']);
});


// default build task
gulp.task('default', ['clean'], function () {

	// define build tasks
	var tasks = [
		'styles',
		'scripts',
		'images',
	];

	// run build
	runSequence(tasks, function () {
		if (config.dev) {
			gulp.start('serve');
			runSequence('fractal:start');
		}
	});

});
