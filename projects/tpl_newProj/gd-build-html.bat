@echo off
set dist=./app/bpmf
rem set postfix=timestamp
set project=./projects/bpmf
set main=main.js
set htmlTemplate=gd-index.tmpl
set assets=assets
set root=root
set packFolderOutput=assets/pack.json
set preprocessor=exporter-processor/Preprocessor.js
cd ..
cd ..
npm run production