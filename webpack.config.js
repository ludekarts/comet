const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Globals.
const isProduction = process.env.NODE_ENV === 'production';
const version = JSON.stringify(require("./package.json").version).replace(/"/g, '');


// ---- MAIN CONFIG ----------------

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './core/comet',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    loaders: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['env', 'es2015']
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        }),
        include: path.join(__dirname, 'src')
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]'
            }
          }
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    historyApiFallback: true
  },

  resolve: {
    alias: {
      'temps': path.resolve(__dirname, 'src/templates'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'tools': path.resolve(__dirname, 'src/tools'),
      'core': path.resolve(__dirname, 'src/core')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body',
      title: `☄ Comet v${version}`,
      filename: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
      disable: !isProduction
    })
  ]
};
