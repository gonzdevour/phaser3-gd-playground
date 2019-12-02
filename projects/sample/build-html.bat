@echo off
set dist=./app/export-html-test
set project=./projects/sample
rem set htmlTemplate=./projects/sample/index.tmpl
rem set main=./projects/sample/main.js
rem set assets=./projects/sample/assets
rem set root=./projects/sample/root
cd ..
cd ..
webpack --config webpack.production.config.js