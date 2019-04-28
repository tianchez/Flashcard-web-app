var webpack = require('webpack');
var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");


var parentDir = path.join(__dirname, '../');
var currentDir = path.join(__dirname, '../');


module.exports = {
    entry: [
        path.join(__dirname, '/src/index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                      '@babel/preset-env',
                      {
                        plugins: [
                          '@babel/plugin-proposal-class-properties'
                        ]
                      }
                    ]
                  }
            },{
                test: /\.less$/,
                loaders: ["style-loader", "css-loder", "less-loader"]
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader"
                  }
                ]
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            {
              test: /\.scss$/,
              use: [
                  "style-loader", // creates style nodes from JS strings
                  "css-loader", // translates CSS into CommonJS
                  "sass-loader" // compiles Sass to CSS, using Node Sass by default
              ]
          },
          { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } }
        ]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        })
    ]
}