var path = require('path');

module.exports = {
    entry: [
      './src/index.js',
      './src/index.css'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "script-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
              // options: {
              //   modules: true,
              //   importLoaders: 1,
              //   localIdentName: "[name]_[local]_[hash:base64]",
              //   sourceMap: true,
              //   minimize: true
              // }
            }
          ]
        }
      ]
    }
  };