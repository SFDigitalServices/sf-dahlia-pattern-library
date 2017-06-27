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

Branches can be used for one-off small feature updates, as well as epic feature branches that contain all of the updates for a particular epic feature. These branches generally correspond to features in the [DAHLIA web app](https://github.com/Exygy/sf-dahlia-web).

* `master` corresponds to `sf-dahlia-web:master`, in that they both represent the current state of all accepted features in QA.
* an example epic feature branch might be `multifamily-shortform` which has all the updates for an entire epic feature (Multifamily Shortform Application)
* an example small feature branch might be `features/utilities-documentation-#143062915` which includes a set of changes specific to one user story (with the pivotal tracker ID found at the end of the branch e.g. `#143062915`)

## Structure
Pattern library is organized from the abstract to the discrete, small to large.

### Base
Otherwise known as globals, these are the underlying variables the fuel the entire pattern library.

### Atoms, Molecules, Organisms
Documentation of our UI components via the browser. Allow clients and designers to sign off on each outside the context of a specific context. Allow the front end dev to sanity check that styles are flowing as predicted. Must include the hologram comment format in your sass file for these to render at the appropriate level.

### Pages, Templates
If you are building a page to test content rules or component variations within a template, you should name that file a page. Pages do not introduce any new components or templates but are used for edge cases and content previews.

## Source:

### /materials
Atomic design front-end partials.

### /views
Page level layout templates.

### /assets/toolkit/styles
Follows the [Atomic Design](http://atomicdesign.bradfrost.com/table-of-contents/) methodology to organizing files.

### ../atoms
Basic HTML elements like typography, forms, inputs, buttons. Atoms are elements that can't be broken down any further without ceasing to be functional.

### ../molecules
Simple groups of UI elements that function together, for example block lists, mobile nav, top bar.

### ../organisms
Relatively complex UI components composed of molecules, atoms and/or other organisms. These include elements such as the footer, page accordions, property card (displaying a single listing).

### ../utilities
Utility classes that augment or override component settings, such as padding, borders and colors.

### ../vendors
CSS files from specific external plugins

### /\_settings.scss
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
