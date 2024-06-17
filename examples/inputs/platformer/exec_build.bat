@echo off

:: 獲取當前目錄的名稱
for %%I in (.) do set CurrDirName=%%~nxI

set dist=./app/%CurrDirName%
set project=%CD%
set main=main.js
set htmlTemplate=settings/index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
cmd /k npm run production