var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  debug: true,
  devtool: 'eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true,

  // devtool:"inline-source-map",
  entry:[
    './src/mobile/webpack-public-path',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'client/app.js'),
  ],
  output:{
    path: path.join(__dirname,"dist"),
    filename:"app.bundle.js",
    publickPath:"/"
  },
  plugins:[
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module:{
    loaders:[
      {
        test:/\.js$/,
        loader: 'babel-loader',
        exclude:/node_modules/,
        query:{
          presets:['es2015','react','stage-0','react-hmre']
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
    ]
  }
}