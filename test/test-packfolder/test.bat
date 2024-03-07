@echo off
for %%I in (.) do set CurrDirName=%%~nxI
set project=./test/%CurrDirName%
set main=test.js
set htmlTemplate=index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
cmd /k npm run dev