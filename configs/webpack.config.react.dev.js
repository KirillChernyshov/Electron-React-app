const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
    // fallback: {
    //   path: require.resolve("path-browserify"),
    //   fs: require.resolve("fs"),
    // }
  },
  entry: ['babel-polyfill', './src/renderer/index.tsx'],
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    // contentBase: path.join(__dirname, '../dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    static: [
      {
        directory: path.join(__dirname, '../dist/renderer'),
        publicPath: '/',
      },
      {
        directory: path.join(__dirname, '../public'),
        publicPath: '/',
      },
    ]
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist/renderer'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
