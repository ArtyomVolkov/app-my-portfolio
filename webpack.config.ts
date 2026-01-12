import path from "path";
import env from "dotenv";

import webpack, { Configuration as WebpackConfig } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { Configuration as WebpackDevServer } from "webpack-dev-server";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

env.config();

const isProd = process.env.NODE_ENV !== "development";

const filename = (ext: string, pathData: webpack.PathData) => {
  if (pathData.chunk && pathData.chunk.name === "service-worker") {
    return `service-worker.${ext}`;
  }
  return !isProd ? `[name].${ext}` : `[name].[contenthash].${ext}`;
};

const ALIAS = {
  "@api": path.resolve(__dirname, "src/api"),
  "@assets": path.resolve(__dirname, "src/assets"),
  "@constants": path.resolve(__dirname, "src/constants"),
  "@services": path.resolve(__dirname, "src/services"),
  "@config": path.resolve(__dirname, "src/config"),
  "@pages": path.resolve(__dirname, "src/pages"),
  "@components": path.resolve(__dirname, "src/components"),
  "@shared": path.resolve(__dirname, "src/shared"),
  "@store": path.resolve(__dirname, "src/store"),
};

const MODULE = {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      loader: "ts-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.html$/,
      loader: "html-loader",
    },
    {
      test: /\.(jsx|js)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
      },
    },
    {
      test: /\.module\.(s[ac]ss|css)$/,
      exclude: /node_modules/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[local]__[hash:base64:5]",
            },
            sourceMap: !isProd,
          },
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: !isProd,
          },
        },
      ],
    },
    {
      test: /\.(s[ac]ss|css)$/,
      exclude: /\.module.(s[ac]ss|css)$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            sourceMap: !isProd,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      exclude: /node_modules/,
      use: {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    },
  ],
};

const PLUGINS = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.PEXELS_API_KEY": JSON.stringify(process.env.PEXELS_API_KEY),
    "process.env.FIREBASE_API_KEY": JSON.stringify(
      process.env.FIREBASE_API_KEY
    ),
    "process.env.HUNTER_API_KEY": JSON.stringify(process.env.HUNTER_API_KEY),
    "process.env.SPOTIFY_APP_URI": JSON.stringify(process.env.SPOTIFY_APP_URI),
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./public/index.html"),
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
    inject: true
  }),
  new ForkTsCheckerWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: !isProd ? "[name].css" : "[name].[hash].css",
    chunkFilename: !isProd ? "[id].css" : "[id].[hash].css",
    attributes: {
      rel: "stylesheet preload",
      as: "style",
    }
  }),
  // new BundleAnalyzerPlugin(),
];

const DEV_SERVER = {
  open: true,
  compress: true,
  host: "localhost",
  static: {
    directory: path.join(__dirname, "public"),
  },
  port: 3000,
  historyApiFallback: true,
};

interface Configuration extends WebpackConfig {
  devServer?: WebpackDevServer;
}

const config: Configuration = {
  entry: {
    main: "./src/index.tsx",
    ...(isProd ? { "service-worker": "./src/service-worker.js" } : {}),
  },
  devtool: isProd ? false : "inline-source-map",
  resolve: {
    alias: ALIAS,
    extensions: [".ts", ".tsx", ".js", ".scss"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: (pathData) => {
      return filename("js", pathData);
    },
    publicPath: "/",
  },
  mode: isProd ? "production" : "development",
  module: MODULE,
  plugins: PLUGINS,
  devServer: DEV_SERVER,
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: isProd ? {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 512000,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          minSize: 20000,
          enforce: true,
        },
      },
    },
  } : {},
};

export default config;
