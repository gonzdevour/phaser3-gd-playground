@echo off
set project=./projects/bpmf
set main=main.js
set htmlTemplate=index.tmpl
set assets=assets
set root=root
set packFolderOutput=assets/pack.json
set preprocessor=exporter-processor/Preprocessor.js
cd ..
cd ..
npm run dev