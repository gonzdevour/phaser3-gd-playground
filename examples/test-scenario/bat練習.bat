@echo off
echo %CD%
echo %~dp0
echo %CD:~0,1% ::C
echo %CD:~0,2% ::C:
echo %CD:~0,3% ::C:\
for %%I in (.) do set CurrDirName=%%~nxI
echo %CurrDirName%
pause
set project=./examples/%CD%
set main=test.js
set htmlTemplate=index.tmpl
set assets=assets
set packFolderOutput=assets/pack.json
set root=root
cd ..
cd ..
npm run dev