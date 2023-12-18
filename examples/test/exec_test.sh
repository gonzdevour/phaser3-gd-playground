#!/bin/bash

# 獲取當前目錄的名稱
CurrDirName=$(basename "$PWD")

# 獲取當前目錄的上一層目錄的名稱
ParentDirName=$(basename "$(dirname "$PWD")")

# 設置環境變數
export project="./$ParentDirName/$CurrDirName"
export main="main.js"
export htmlTemplate="settings/index.tmpl"
export assets="assets"
export packFolderOutput="assets/pack.json"
export root="root"

cd ../..
npm run dev
