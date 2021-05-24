const path = require("path");
const baseConfigFn = require("./webpack.base");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const cdnbuild = require('@ali/cdn-build');
const util = require("./util");
const pkg = require("../package.json");

// 删除html里的注释
const fs = require("fs");

function RemoveHtmlComments() {
  this.pages = ["./build/index.html"];
}

RemoveHtmlComments.prototype.apply = function (compiler) {
  const _this = this;
  compiler.plugin("done", () => {
    _this.pages.forEach((page) => {
      fs.readFile(page, { encoding: "utf-8" }, (err, data) => {
        if (!data) {
          return;
        }
        const reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;
        const newString = data.replace(reg, word => (/^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word));
        fs.writeFileSync(page, newString);
      });
    });
  });
};

function generateConfig() {
  process.env.NODE_ENV = "production";

  const baseConfig = baseConfigFn();
  const info = util.getHtmlPlugin("production");

  const config = Object.assign({}, baseConfig, {
    mode: "production",
    entry: info.entry,
    output: {
      path: path.join(__dirname, "../build"),
      filename: "[name].js?[chunkhash:8]",
      chunkFilename: "[name].js?[chunkhash:8]",
    },
    plugins: baseConfig.plugins.concat([
      new MiniCssExtractPlugin({
        filename: "[name].css?[contenthash:8]",
        allChunks: true,
        disable: false,
      }),

      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true),

      new CleanWebpackPlugin(["build/"], { root: path.resolve(__dirname, "../") }),
      new RemoveHtmlComments(),
    ], info.plugins),
  });

  config.optimization = {
    splitChunks: {
      name: false,
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
          mangle: {
            reserved: ["$", "exports", "require"],
          },
          output: {
            ascii_only: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  };
  config.module.rules = config.module.rules.concat([
    {
      test: /\.scss|\.sass$/,
      exclude: [/node_modules/],
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        "sass-loader",
      ],
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: ["style-loader", "css-loader"],
    },
  ]);

  return config;
}

module.exports = generateConfig();