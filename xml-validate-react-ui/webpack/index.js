const { resolve } = require("path");
const rules = require("./rules");
const plugins = require("./plugins");
const devServer = require("./dev_server");
const devtool = require("./devtool");
const isProduction = process.env.NODE_ENV === "production";
const TerserPlugin = require("terser-webpack-plugin");

const settings = {
  mode: isProduction ? "production" : "development",
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css", ".scss"],
  },
  context: resolve(__dirname, ".."),
  entry: "./client/index.jsx",
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "..", "dist"),
  },
  optimization: !isProduction
    ? { minimize: false }
    : {
        minimize: true,
        minimizer: [new TerserPlugin({ test: /\.js(\?.*)?$/i })],
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "initial",
              name: "vendor",
              test: /node_modules/,
              enforce: true,
            },
          },
        },
        runtimeChunk: true,
      },
  module: {
    rules,
  },
  plugins,
  devServer,
  devtool,
};
module.exports = settings;
