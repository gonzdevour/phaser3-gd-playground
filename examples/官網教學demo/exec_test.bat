@echo off

set project=%CD%
set main=main.js
set htmlTemplate=settings/index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
npm run dev