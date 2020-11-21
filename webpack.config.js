module.exports = {
	entry: __dirname+'/src/App.jsx',
	mode: 'production',
	output: {
		path: __dirname+'/public/js',
		filename: 'bundle.js'
	},
	watch: false,
	module: {
		rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env'],
							['@babel/preset-react']
						]
					}
				}
			}
		]
	}
}
