@echo off
set project=./examples/textplayerDialog
set main=main.js
set htmlTemplate=../example.tmpl
set root=root
set assets=../assets
set packFolderOutput=../assets/pack.json
set preprocessor=../exporter-processor/Preprocessor.js
cd ..
cd ..
npm run dev