@echo off
set dist=./app/export-html-test
set project=./projects/sample
rem set main=main.js
rem set htmlTemplate=index.tmpl
rem set assets=assets
rem set root=root
cd ..
cd ..
webpack --config webpack.production.config.js