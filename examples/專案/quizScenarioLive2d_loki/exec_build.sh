#!/bin/bash

# 獲取當前目錄的名稱
CurrDirName=$(basename "$PWD")

# 設置環境變數
export dist="./app/$CurrDirName"
export project=$PWD
export main="gdk/main.js"
export htmlTemplate="settings/index.tmpl"
export assets="assets"
export packFolderOutput="assets/pack.json"
export root="root"

cd ../..
npm run production
