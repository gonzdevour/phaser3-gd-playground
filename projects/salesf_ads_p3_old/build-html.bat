@echo off
set dist=C:\Users\JyunRu\Dropbox\Public\salesf_ads_p3_old
set htmlTemplate=./projects/salesf_ads_p3_old/index.tmpl
set main=./projects/salesf_ads_p3_old/main.js
set assets=./projects/salesf_ads_p3_old/assets
cd ..
cd ..
webpack --config webpack.production.config.js