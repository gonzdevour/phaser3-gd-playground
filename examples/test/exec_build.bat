@echo off

:: 獲取當前目錄的名稱
for %%I in (.) do set CurrDirName=%%~nxI

:: 獲取當前目錄的上一層目錄的名稱
for %%I in (..) do set ParentDirName=%%~nxI

set dist=./app/%CurrDirName%
set project=./%ParentDirName%/%CurrDirName%

set main=main.js
set htmlTemplate=settings/index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
npm run production