#!/bin/bash
DIST=build
if [ ! -d "$DIST" ]; then
	echo "** Uh oh! **"
	echo "Directory '$DIST' does not exist -- you need to run 'npm run-script build' before deploying."
	exit
fi
cd $DIST
git init
appname="$1"
if [ $appname ]; then
	app="sf-dahlia-pl-$appname"
	heroku create $app
else
	app="sf-dahlia-pattern-library"
fi
echo '{
  "require": {
    "php": "^5.6.0"
  }
}' > composer.json
echo '{
    "_readme": [
        "This file locks the dependencies of your project to a known state",
        "Read more about it at http://getcomposer.org/doc/01-basic-usage.md#composer-lock-the-lock-file",
        "This file is @generated automatically"
    ],
    "hash": "35ebe24ec8efc38b3b544041896aa986",
    "packages": [],
    "packages-dev": [],
    "aliases": [],
    "minimum-stability": "stable",
    "stability-flags": [],
    "prefer-stable": false,
    "prefer-lowest": false,
    "platform": {
        "php": "^7.3.4"
    },
    "platform-dev": []
}' > composer.lock
echo 'web: vendor/bin/heroku-php-nginx' > Procfile
echo 'vendor' > .gitignore
git remote add $app https://git.heroku.com/$app.git
git add .
git commit -am 'Deploying latest pattern library to heroku'

# Note that this is "master", not "main", because heroku always defaults to a master branch
git push --force $app master
