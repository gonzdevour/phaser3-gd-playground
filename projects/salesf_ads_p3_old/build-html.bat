@echo off
set dist=./app/salesf_ads
set postfix=timestamp
set project=%CD%
cd ..
cd ..
webpack --config webpack.production.config.js