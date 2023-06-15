const path = require('path'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: { main: './src/scripts/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
        publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    port: 8080,
    compress: true
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader', 
                options: { importLoaders: 1 }
            }, 'postcss-loader']
        },
        {
            test: /\.(png|svg|jpg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'images/[name].[hash].[ext]',
            }
        },
        {
            test: /\.(woff|woff2)$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name].[hash].[ext]',
            }
        }
      ], 
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html' 
      }),
    new MiniCssExtractPlugin({
        filename: 'index.css'
    }),
  ]
}