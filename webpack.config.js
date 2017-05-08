module.exports = {
  entry: "./lib/client/game_view.js",
  output: {
  	filename: "./lib/client/bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};
