@echo off
set dist=C:\Users\JyunRu\Dropbox\Public\salesf_ads_p3
set htmlTemplate=./projects/salesf_ads/index.tmpl
set main=./projects/salesf_ads/main.js
set assets=./projects/salesf_ads/assets
cd ..
cd ..
webpack --config webpack.production.config.js