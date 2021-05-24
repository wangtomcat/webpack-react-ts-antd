const path = require("path");
const baseConfigFn = require("./webpack.base");
const webpack = require("webpack");
const util = require("./util");

process.env.NODE_ENV = "development";

module.exports = function (port) {
  const baseConfig = baseConfigFn();
  const publicPath = "/";
  const info = util.getHtmlPlugin("development");

  const config = Object.assign({}, baseConfig, {
    mode: "development",
    entry: info.entry,
    output: {
      path: path.join(__dirname, "../build"),
      publicPath,
      filename: "[name].js?[hash:8]",
      chunkFilename: "[name]:[hash:8].js",
    },
    optimization: {
      splitChunks: {
        automaticNameDelimiter: "-", // 打包分隔符
      },
    },
    devServer: {
      hot: true,
      inline: true,
      disableHostCheck: true,
      publicPath,
      contentBase: "./src/",
      historyApiFallback: true,
      noInfo: false,
      port: 8881,
      proxy: {
        "/proxy/*": {
          target: `http://localhost:58881`,
          // target: "https://console.cloud.tmall.com",
          pathRewrite: { "^/proxy": "" },
          changeOrigin: true,
        },
        '/local/*': {
          target: `http://localhost:58881`,
          pathRewrite: { '^/local': '' },
          changeOrigin: true,
        },
      },
    },
    plugins: baseConfig.plugins.concat([
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.SourceMapDevToolPlugin({}),
    ], info.plugins),
  });


  config.module.rules = config.module.rules.concat([
    {
      test: /\.css$/,
      include: /node_modules/,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.scss|\.sass$/,
      exclude: [/node_modules/],
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader",
      ],
    },
  ]);
  return config;
};