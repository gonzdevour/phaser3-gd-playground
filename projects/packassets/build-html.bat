@echo off
set dist=./app/packassets-test
rem set postfix=timestamp
set project=./projects/packassets
set main=main.js
set htmlTemplate=index.tmpl
set assets=assets
set root=root
set packFolderOutput=assets/pack.json
cd ..
cd ..
npm run production