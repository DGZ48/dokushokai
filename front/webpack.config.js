require('@babel/register');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = [
	{
		mode: 'development',
		entry: src + '/index.jsx',
		
		output: {
			path: dist,
			filename: 'bundle.js'
		},
	
		module: {
			rules: [
				{
					test: /\.js[x]?$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.(scss|sass)$/i,
					include: [
						path.resolve(__dirname, 'node_modules'),
						src,
					],
					use: [
						//MiniCssExtractPlugin.loader, 'css-loader'
						'css-loader', 'sass-loader'
					]
				}
			]
		},
		
		//resolve: {
		//	extensions: ['.js', '.jsx']
		//}, 
		
		plugins: [
			new HtmlWebpackPlugin({
				template: src + '/index.html',
				filename: 'index.html'
			}),
			//new MiniCssExtractPlugin({filename: 'style.css'})
		]
	}
];
