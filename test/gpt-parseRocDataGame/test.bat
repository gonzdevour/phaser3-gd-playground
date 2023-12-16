@echo off

:: 獲取當前目錄的名稱
for %%I in (.) do set CurrDirName=%%~nxI

:: 獲取當前目錄的上一層目錄的名稱
for %%I in (..) do set ParentDirName=%%~nxI

:: 組合這兩個名稱
set project=./%ParentDirName%/%CurrDirName%

set main=test.js
set htmlTemplate=index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
npm run dev