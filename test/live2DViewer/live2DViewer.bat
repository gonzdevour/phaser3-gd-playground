@echo off
set project=./examples/live2DViewer
set main=main.js
set htmlTemplate=index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set preprocessor=exporter-processor/Preprocessor.js
set root=root
cd ..
cd ..
npm run dev