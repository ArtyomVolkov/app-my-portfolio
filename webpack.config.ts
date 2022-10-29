import path from 'path';
import env from 'dotenv';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';
import { Configuration as WebpackDevServer } from 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

env.config();

const isProd = process.env.NODE_ENV !== 'development';

const filename = (ext) => !isProd ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const ALIAS = {
  '@api': path.resolve(__dirname, 'src/api'),
  '@assets': path.resolve(__dirname, 'src/assets'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@shared': path.resolve(__dirname, 'src/shared'),
  '@store': path.resolve(__dirname, 'src/store'),
};

const MODULE = {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
      test: /\.(jsx|js)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.(s[ac]ss|css)$/i,
      exclude: /node_modules/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {},
      }, 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      exclude: /node_modules/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    },
  ],
};

const PLUGINS = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new InterpolateHtmlPlugin({
    PUBLIC_URL: '',
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './public/index.html'),
    minify: {
      collapseWhitespace: isProd,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
  }),
  new ForkTsCheckerWebpackPlugin(),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: `${filename('css')}`,
  }),
  // new BundleAnalyzer(),
];

const DEV_SERVER = {
  open: true,
  compress: true,
  host: 'localhost',
  static: {
    directory: path.join(__dirname, 'public'),
  },
  port: 3000,
  historyApiFallback: true,
};

const OPTIMIZATION = {
  minimize: true,
  minimizer: isProd
    ? [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ]
    : [],
};

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServer;
}

const config: Configuration = {
  entry: ['regenerator-runtime/runtime.js', './src/index.tsx'],
  devtool: isProd ? false : 'inline-source-map',
  resolve: {
    alias: ALIAS,
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: `${filename('js')}`,
    publicPath: '/',
  },
  module: MODULE,
  plugins: PLUGINS,
  devServer: DEV_SERVER,
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: OPTIMIZATION,
};

export default config;
