#!/bin/bash
DIST=dist
if [ ! -d "$DIST" ]; then
	echo "** Uh oh! **"
	echo "Directory '$DIST' does not exist -- you need to run 'npm start' before deploying."
	exit
fi
cd $DIST
git init
appname="$1"
if [ appname ]; then
	app="sf-dahlia-pl-$appname"
	heroku create $app
else
	app="sf-dahlia-pattern-library"
fi
git remote add heroku git@heroku.com:$app.git
git add .
git commit -am 'Deploying latest pattern library to heroku'
git push --force heroku master
