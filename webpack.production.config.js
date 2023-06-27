const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const PackFolder = require('./plugins/packfolder/PackFolder.js');
const GlobalPreprocessor = require('./plugins/exporter-preprocessor/Preprocessor.js');

var dist = process.env.dist;
var postfix = process.env.postfix || false;
if (postfix) {
    var dateTime = new Date();
    postfix = dateTime.toLocaleString().replace(/\/|:|\s/g, '-');
    dist = `${dist}-${postfix}`;
}

var projectRoot = process.env.project || false;
var projectMain = process.env.main || 'main.js'; // Entery js
var htmlTemplate = process.env.htmlTemplate || 'index.tmpl'; // Template of index.html
var assetsFolder = process.env.assets || 'assets'; // Map to assets folder
var rootAssetsFolder = process.env.root || 'root'; // Map to root folder
var packFolderOutput = process.env.packFolderOutput || false;
var packFolderConfigExtension = process.env.packFolderConfigExt || '.cfg';
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

const distFolder = path.resolve(__dirname, dist);
console.log(`Export to ${distFolder}`)

var plugins = [];

if (packFolderOutput) {
    plugins.push({
        apply: (compiler) => {
            compiler.hooks.beforeRun.tap('PackFolderPlugin', () => {
                PackFolder(assetsFolder, packFolderOutput, {
                    relatedPathFrom: projectRoot,
                    configYamlExtension: packFolderConfigExtension
                });
                console.log(`PackFolder ${assetsFolder}`);
            });
        },
    });
}

plugins.push({
    apply: (compiler) => {
        compiler.hooks.beforeRun.tap('MyPreprocessPlugin', () => {
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
        WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
        CANVAS_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true        
        "typeof WEBGL_DEBUG": JSON.stringify(false),
    })
)

// Don't clean dist folder
// plugins.push(
//     new CleanWebpackPlugin([distFolder])
// )

plugins.push(
    new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
    })
)

plugins.push(
    new HtmlWebpackPlugin({
        filename: distFolder + '/index.html',
        template: htmlTemplate,
        chunks: ['app'],
        chunksSortMode: 'manual',
        // minify: {
        //     removeAttributeQuotes: true,
        //     collapseWhitespace: true,
        //     html5: true,
        //     minifyCSS: true,
        //     minifyJS: true,
        //     minifyURLs: true,
        //     removeComments: true,
        //     removeEmptyAttributes: true
        // },
        hash: true
    })
)

if (fs.existsSync(assetsFolder)) {
    var ignore;
    if (packFolderOutput) {
        var ignoreFile = `**/*${packFolderConfigExtension}`;
        console.log(`Ignore pack-config-file '${ignoreFile}'`)
        ignore = [ignoreFile];
    }
    plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: assetsFolder,
                    to: distFolder + '/assets/',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ignore,
                    },
                }
            ],
        }),
    )
}

if (fs.existsSync(rootAssetsFolder)) {
    plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: rootAssetsFolder,
                    to: distFolder
                }
            ],
        }),
    )
}

module.exports = {
    mode: 'production',
    entry: {
        app: [
            '@babel/polyfill',
            projectMain
        ]
    },
    output: {
        path: distFolder,
        publicPath: './',
        library: '[name]',
        libraryTarget: 'umd',
        filename: 'js/[name].bundle.js'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },
    plugins: plugins,
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
    }
}