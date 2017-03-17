# Dr Lookup

#### Epicodus JS Week 1 Project, 3/17/2017

#### By Charles Peden

## Description

A website using the BetterDoctors API where users may enter a medical issue (ie: “toothache”) into a form, submit it, and receive a list of doctors they may seek out to help with their medical issue.

Stretch Goals:


## Setup Requirements
node.js (for npm)  https://nodejs.org/
npm https://www.npmjs.com/
gulp http://gulpjs.com/
bower https://bower.io/
ruby (for gem install sass) https://www.ruby-lang.org/
sass http://sass-lang.com/install
optional installation tool for Mac Users: Homebrew https://brew.sh/


## Installation Instructions
* Clone project.

Acquire API key from http://developer.nytimes.com/.

Create .env file at root of project folder with the following single line:

exports.apiKey = "your-Better-Drs-API-key-here";

then run at the command line:

npm install

bower install

gem install sass

gulp jshint (to check for errors)

gulp dev (to generate build, gulp prod to uglify/minify the build)

gulp servedev (to serve the dev build, gulp serveprod to serve the production)

## Remove build folder from git project (after adding it to .gitignore)

git filter-branch --tree-filter 'rm -rf build' --prune-empty HEAD

git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d

(edited README.md)

git add README.md

git pair-commit -m "remove build from project"

git gc

git push origin master --force


## Known Bugs
* No known bugs

## Support and contact details
* No support

## Technologies Used
* Git, JS, CSS,

## Copyright (c)
* 2017 Charles Peden

## License
* MIT

##Implementation Plan
1. draft app design
  * sketch out notion of what query and result pages will look like
  * develop site data-flow Plan
  * identify necessary methods, their function and positions in data flow
  * identify necessary files to be created, their names and locations
2. npm, gulp, and sass framework buildout
  * initialize npm & bower
  * install the following dependencies:
      * npm install gulp --save-dev
      * npm install browserify --save-dev
      * npm install gulp-concat --save-dev
      * npm install gulp-uglify --save-dev
      * npm install gulp-util --save-dev
      * npm install del --save-dev
      * npm install jshint --save-dev
      * npm install vinyl-source-stream --save-dev
      * npm install browser-sync --save-dev
      * npm install bower-files --save-dev
      * npm install gulp-jshint --save-dev
      * npm install gulp-sass gulp-sourcemaps --save-dev
      * bower install jquery --save
      * bower install bootstrap --save
  * build out gulpfile.js, testing dependency functionality piece by piece
3. get a sample data result from website to build out
  * save data sample in js folder
4. rudimentary front end for getting info for query and display results
5. write js for manipulation of front end data into api query form
6. back end api query & data manipulation
7. handle errors: empty result set, bad key or search data, bad destination
8. manipulation of results to display
9. styling and completion of html



* End specifications
