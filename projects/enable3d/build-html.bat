@echo off
set dist=./app/export-enable3d-test
set postfix=timestamp
set project=./projects/enable3d
rem set main=main.js
rem set htmlTemplate=index.tmpl
rem set assets=assets
rem set root=root
cd ..
cd ..
webpack --config webpack.production.config.js