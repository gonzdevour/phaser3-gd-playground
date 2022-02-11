@echo off
set project=./projects/packassets
set main=main.js
set htmlTemplate=index.tmpl
set assets=assets
set root=root

call node pack.js
cd ..
cd ..
npm run dev