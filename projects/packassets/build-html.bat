@echo off
set dist=./app/export-html-test
rem set postfix=timestamp
set project=./projects/packassets
set main=main.js
set htmlTemplate=index.tmpl
set assets=assets
set root=root

call node pack.js
cd ..
cd ..
npm run production