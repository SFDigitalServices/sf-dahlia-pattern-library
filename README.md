#Dahlia Pattern Libary

Includes:

* Fabricator
* Gulp
* Foundation

## Getting Started

1. Install Node
1. Install gulp-sass

```
npm install gulp-sass
```

1. Clone this repo
1. Start your server

```
$ npm start
```

## Deploying to Heroku

The Heroku application is served out of the `dist` directory which is the static HTML output of the pattern library. This directory is ignored from git and recreated every time you run `npm start`.

To deploy the application (run this from the project directory):

* `./deploy.sh [appname]`
* `appname` is an optional argument, which will create and deploy to a new heroku app:
  * `sf-dahlia-pl-[appname]` (if it doesn't already exist).
  * For example: `./deploy.sh testing` will deploy to `sf-dahlia-pl-testing.herokuapp.com`
* This works from any branch, for example if you have checked out the `dev` branch and you `./deploy.sh new-menu` then the dev branch will be deployed to `sf-dahlia-pl-new-menu.herokuapp.com`

## Branches

* alpha is for updates to the public version of the app
* master is for engineers working on feature updates

## Structure
Pattern library is organized from the abstract to the discrete, small to large.

### /base
Otherwise known as globals are the underlying variables the fuel the entire pattern library.

### /atoms, /molecules, /organisms
Documentation of our UI components via the browser. Allow clients and designers to sign off on each outside the context of a specific context. Allow the front end dev to sanity check that styles are flowing as predicted. Must include the hologram comment format in your sass file for these to render at the appropriate level.

### /pages
If you are building a page to test content rules or component variations within a template, you should name that file a page. Pages do not introduce any new components or templates but are used for edge cases and content previews.

## Source:

### /materials
Atomic design front-end partials.

### /views
Page level layout templates.

### /assets/toolkit/styles
Follows a SMACSS based approach to organizing Sass files.
http://www.sitepoint.com/architecture-sass-project/

### ../base
Resets, global style settings and simplest atomic elements.

### ../components
Discrete parts of the UI. Flat directory instead of an atomic structure for simplicity.

### ../structures
More substantial persistent UI elements, such as header, footer, modal and navigation

### ../layouts
Non component, pure layout based rule sets. Define key page templates

### ../pages
Rules specific to specific page rules or a unique url

### ../helpers
Utility classes that override component settings, such as padding and color

### ../patterns
Styles specific to the pattern library itself

### ../vendors
CSS files from specific external plugin

### /_settings.scss
Reference for all foundation default settings. Not editable

### /toolkit.css
Main manifest for how we are building the cascade.

## Adding 3rd Party Dependencies

Fabricator uses Webpack Module Bundler.

In general, Webpack prefers modules from npm over bower.
In many cases modules from npm are better than the same module from bower. Bower mostly contain only concatenated/bundled files which are:

* More difficult to handle for webpack
* More difficult to optimize for webpack
* Sometimes only useable without a module system
* So prefer to use the CommonJs-style module and let webpack build it.
