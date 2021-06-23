const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var projectRoot = process.env.project || false;
var projectMain = process.env.main || 'main.js'; // Entery js
var htmlTemplate = process.env.htmlTemplate || 'index.tmpl'; // Template of index.html
var assetsFolder = process.env.assets || 'assets'; // Map to assets folder
var rootAssetsFolder = process.env.root || 'root'; // Map to root folder

console.log(process.env.main);
console.log(projectMain);

if (projectRoot) {
    projectRoot = path.resolve(__dirname, projectRoot);
    projectMain = path.resolve(projectRoot, projectMain);
    console.log(projectMain);
    htmlTemplate = path.resolve(projectRoot, htmlTemplate);
    assetsFolder = path.resolve(projectRoot, assetsFolder);
    rootAssetsFolder = path.resolve(projectRoot, rootAssetsFolder);
}

// console.log(projectRoot);
// console.log(projectMain);
// console.log(htmlTemplate);
// console.log(assetsFolder);
// console.log(rootAssetsFolder);

module.exports = {
    mode: 'development',
    entry: {
        app: [
            '@babel/polyfill',
            projectMain
        ]
    },
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'watch-dist'),
        publicPath: './watch-dist/',
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
            CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: htmlTemplate,
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: './',
                routes: {
                    '/assets': assetsFolder,
                    '': rootAssetsFolder
                }
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },
    node: {
        fs: 'empty'
    }
}