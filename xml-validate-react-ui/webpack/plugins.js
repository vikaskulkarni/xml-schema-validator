const { resolve, join } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const dist = "dist";
const dotenv = require("dotenv");
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const cleanOptions = {
  root: resolve(__dirname, ".."),
  exclude: [`${dist}/.gitignore`],
  verbose: true,
  cleanStaleWebpackAssets: true,
  cleanOnceBeforeBuildPatterns: [`${dist}/*.*`],
  dry: false,
};
const plugins = [
  new webpack.DefinePlugin(envKeys),
  new webpack.EnvironmentPlugin({ NODE_ENV: "development" }),
  new HtmlWebpackPlugin({
    template: join("client", "index.html"),
    favicon: join("client", "favicon.ico"),
  }),
  new webpack.NamedModulesPlugin(),
];
if (isProduction) {
  console.log(envKeys);
  plugins.push(new CleanWebpackPlugin(cleanOptions));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = plugins;
