#!/bin/bash

# 設置環境變數
export project=$PWD
export main="test.js"
export htmlTemplate="settings/index.tmpl"
export assets="assets"
export packFolderOutput="assets/pack.json"
export root="root"

cd ../..
npm run dev
