@echo off
set project=./examples/rtPaster
set main=gdk/main.js
set htmlTemplate=gdk/index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set preprocessor=gdk/exporter-processor/Preprocessor.js
set root=root
cd ..
cd ..
npm run dev