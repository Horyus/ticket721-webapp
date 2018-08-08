const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin

module.exports = (env) => {
  return {
    optimization: {
      minimizer: [
	new UglifyJsPlugin()
      ]
    },
    devServer: {
      port: 8081,
      historyApiFallback: {
	rewrites: [
	  { from: /^\/$/, to: '/index.html' },
	  { from: /^\/sale\/.*$/, to: '/index.html' }
	]
      }
    },
    module: {
      rules: [
	{
	  test: /\.css$/,
	  use: [{loader: "style-loader"}, {loader: "css-loader"}]
	},
	{
	  test: /\.scss$/,
	  use: [{loader: "style-loader"}, {loader: "css-loader"}]
	},
	{
	  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
	  loader: 'url-loader?limit=100000'
	},
	{
	  test: /\.js$/,
	  exclude: /node_modules/,
	  loader: "babel-loader",
	  options: {
	    presets: ['babel-preset-es2016', 'babel-preset-es2017', 'babel-preset-react']
	  }
	}
      ]
    },
    node: {
      console: true,
      fs: 'empty',
      net: 'mock',
      tls: 'mock'
    },
    devtool: "cheap-source-map",
    entry: ['babel-polyfill', './src/dapp.js'],
    output: {
      path: __dirname + '/webpack_dist/'
    },
    plugins: [
      new webpack.DefinePlugin({
	'process.env.API_URL': "\"" + env.API_URL + "\""
      })
    ]
  }
};

