const path = require('path');

module.exports = {
  entry: './frontend/index.jsx',
  output: {
    path: path.resolve(__dirname, 'static', 'bundles'),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              encoding: false,
            },
          },
        ],
      },
      {
        test: /\.gif$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  devtool: 'source-map',
};

