const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist;";
const devtool = devMode ? "source-map" : undefined;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode,
  target,
  devtool,
  entry: ["@babel/polyfill", path.resolve(__dirname, "src", "script.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "script.[contenthash].js",
  },
  devServer: {
    port: 9090,
    compress: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
