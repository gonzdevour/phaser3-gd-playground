@echo off
set dist=C:\Users\JyunRu\Dropbox\Public\hellop3_website
set htmlTemplate=./projects/hellop3/index.tmpl
set main=./projects/hellop3/main.js
set assets=./projects/hellop3/assets
cd ..
cd ..
webpack --config webpack.production.config.js