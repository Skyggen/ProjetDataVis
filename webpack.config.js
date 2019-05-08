const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader'
      },
      { 
        test:/\.css$/,
        use: [ 'style-loader', {
          loader: 'css-loader',
          options: {
            url: false
          } 
         }] ,        
      },      
      { 
        test: /\.handlebars$/, 
        use: 'handlebars-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },  
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new webpack.ProvidePlugin({
        _: 'underscore'            
    })
  ]
};