var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
	entry:{
		 // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
 		//  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		// "main"    : './client/index',
		"login"   : './client/login',
		"app" 	  : './client/app.js'
	},

	output:{
		path: path.join(__dirname,"dist"),
		filename:"[name].bundle.js"
		
	},
	plugins:[
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin('[name]-[hash].min.css'),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
	      compressor: {
	        warnings: false,
	        screw_ie8: true
	      }
	    }),
	    new StatsPlugin('webpack.stats.json', {
	      source: false,
	      modules: false
	    }),
	    new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production')
	    })
	],
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader: 'babel',
				exclude:/node_modules/,
				
				query:{
					presets:['es2015','react','stage-0']
				}
			},

	         {
	            test    : /(\.scss|\.css)$/,
	            include : path.resolve(__dirname, './node_modules','react-toolbox'),
	            loaders : [
	              require.resolve('style-loader'),
	              require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
	              require.resolve('sass-loader') + '?sourceMap'
	            ]
	          },
			
            {
	            test: /\.s?css$/,
	            loaders: ['style', 'css', 'sass'],
	            exclude: path.resolve(__dirname, './node_modules','react-toolbox')
	        }
	          
	          , { 
			      test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/, 
			      loader: 'url',
			    }

		]
	},
	'uglify-loader': {
	    mangle: false
	}
}