@echo off
set dist=./app/test-fx-warp
rem set postfix=timestamp
set project=./examples/test-fx-warp
set main=test.js
set htmlTemplate=index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
npm run production