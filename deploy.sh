#!/bin/bash
cd dist
git init
git remote add dev git@heroku.com:sf-dahlia-pattern-library-dev.git
git add .
git commit -am 'Deploying latest pattern to heroku'
git push --force dev master
