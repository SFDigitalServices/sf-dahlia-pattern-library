#!/bin/bash
DIST=dist
if [ ! -d "$DIST" ]; then
	echo "** Uh oh! **"
	echo "Directory '$DIST' does not exist -- you need to run 'npm start' before deploying."
	exit
fi
cd $DIST
git init
git remote add dev git@heroku.com:sf-dahlia-pattern-library-dev.git
git add .
git commit -am 'Deploying latest pattern to heroku'
git push --force dev master
