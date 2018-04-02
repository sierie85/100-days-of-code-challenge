const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: {
    entry: './public/js/entry.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
          }
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css"
    })
  ]
};

// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
process.noDeprecation = true;

module.exports = config;
