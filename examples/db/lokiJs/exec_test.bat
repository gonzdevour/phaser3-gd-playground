@echo off

set project=%CD%
set main=test.js
set htmlTemplate=settings/index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
cmd /k npm run dev