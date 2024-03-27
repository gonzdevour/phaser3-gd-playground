const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const PackFolder = require('./plugins/packfolder/PackFolder.js');
const GlobalPreprocessor = require('./plugins/exporter-preprocessor/Preprocessor.js');

//var pathToRexPlugins = 'C:/Users/JyunRu/Documents/GitHub/phaser3-rex-notes/plugins';
//var pathToGdkPlugins = 'C:/Users/JyunRu/Documents/GitHub/phaser3-gd-playground/plugins';
var pathToRexnote = '../phaser3-rex-notes';
var pathToRexPlugins = '../phaser3-rex-notes/plugins';
var pathToGdkPlugins = './plugins';

var projectRoot = process.env.project || false;
var projectMain = process.env.main || 'main.js'; // Entery js
var htmlTemplate = process.env.htmlTemplate || 'index.tmpl'; // Template of index.html
var assetsFolder = process.env.assets || 'assets'; // Map to assets folder
var rootAssetsFolder = process.env.root || 'root'; // Map to root folder
var packFolderOutput = process.env.packFolderOutput || false;
var localPreprocessorMain = process.env.preprocessor || false;

if (projectRoot) {
    projectRoot = path.resolve(__dirname, projectRoot);
    projectMain = path.resolve(projectRoot, projectMain);
    htmlTemplate = path.resolve(projectRoot, htmlTemplate);
    assetsFolder = path.resolve(projectRoot, assetsFolder);
    rootAssetsFolder = path.resolve(projectRoot, rootAssetsFolder);

    if (packFolderOutput) {
        packFolderOutput = path.resolve(projectRoot, packFolderOutput);
    }

    if (localPreprocessorMain) {
        localPreprocessorMain = path.resolve(projectRoot, localPreprocessorMain);
    }
}

console.log('check path:');
console.log(projectRoot);
console.log(projectMain);
console.log(htmlTemplate);
console.log(assetsFolder);
console.log(rootAssetsFolder);
console.log(pathToRexPlugins)
console.log(pathToGdkPlugins)


var plugins = [];

if (packFolderOutput) {
    plugins.push({
        apply: (compiler) => {
            // Run PackFolder at each watchRun
            compiler.hooks.watchRun.tap('PackFolderPlugin', () => {
                PackFolder(assetsFolder, packFolderOutput, {
                    relatedPathFrom: projectRoot
                });
                console.log(`PackFolder ${assetsFolder}`);
            });
        },
    });
}

plugins.push({
    apply: (compiler) => {
        compiler.hooks.compile.tap('MyPreprocessPlugin', () => {
            var config = {
                projectRoot: projectRoot,
                assetsFolder: assetsFolder,
            }
            GlobalPreprocessor(config);

            if (localPreprocessorMain) {
                var localPreprocess = require(localPreprocessorMain);
                localPreprocess(config);
            }
        });
    },
});

plugins.push(
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
        "typeof WEBGL_DEBUG": JSON.stringify(false),
        WEBGL_DEBUG: JSON.stringify(false),
    })
)

plugins.push(
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
    })
)

var port = process.env.PORT || Math.floor(Math.random() * 65535)
plugins.push(
    new BrowserSyncPlugin({
        host: process.env.IP || 'localhost',
        port: port,
        server: {
            baseDir: './',
            routes: {
                '/assets': assetsFolder,
                '': rootAssetsFolder
            }
        },

        ui: {
            port: 65535 - port
        }
    })
)

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
    plugins: plugins,
    resolve: {
        alias: {
            // 其他別名配置...
            gdkPlugins: path.resolve(__dirname, pathToGdkPlugins),
            rexnotePlugins: path.resolve(__dirname, pathToRexPlugins),
            rexnote: path.resolve(__dirname, pathToRexnote),
        },
        extensions: ['.ts', '.js'],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
        }
    },
    node: {
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript'
                    ]
                }
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                    ]
                }
            },
            {
                test: /phaser-split\.js$/,
                use: 'raw-loader'
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },
}