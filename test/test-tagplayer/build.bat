@echo off
for %%I in (.) do set CurrDirName=%%~nxI
set dist=./app/%CurrDirName%
rem set postfix=timestamp
set project=./examples/%CurrDirName%
set main=test.js
set htmlTemplate=index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
npm run production