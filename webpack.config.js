const path = require('path');

module.exports = {
	entry: './frontend/index.jsx',
	output: {
		path: path.resolve(__dirname, 'static', 'bundles'),
    filename: "bundle.js",
    mode: 'development'
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '*']
	},
	devtool: 'source-map'
};