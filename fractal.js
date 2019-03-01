'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'DAHLIA Pattern Library');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));


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

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'dist/toolkit'));
