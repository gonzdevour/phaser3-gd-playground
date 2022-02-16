@echo off
set dist=./app/bopomofo-test
rem set postfix=timestamp
set project=./projects/bopomofo
set main=main.js
set htmlTemplate=index.tmpl
set assets=assets
set root=root
set packFolderOutput=assets/pack.json
cd ..
cd ..
npm run production