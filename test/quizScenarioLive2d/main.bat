@echo off
for %%I in (.) do set CurrDirName=%%~nxI
set project=./examples/%CurrDirName%
set main=gdk/main.js
set htmlTemplate=settings/index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
cmd /k npm run dev