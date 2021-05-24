const path = require("path");
const webpack = require("webpack");

const baseDir = path.resolve(__dirname, "../");
const pkg = require("../package.json");


module.exports = function () {
  const baseConfig = {
    context: baseDir,
    module: {
      rules: [
        {
          test: /\.ts[x]?$/,
          use: ["ts-loader"],
        },
        {
          test: /\.js[x]?$/,
          loader: "babel-loader",
          // include: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../vms")],
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }],
              "@babel/preset-react",
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "@babel/plugin-proposal-function-sent",
              "@babel/plugin-proposal-export-namespace-from",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-throw-expressions",
              ["@babel/plugin-proposal-class-properties", { loose: false }],
              "@babel/plugin-syntax-dynamic-import",
            ],
          },
        },
        {
          test: /\.(png|jpg|gif|ico|ttf|woff|eot|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: ["url-loader?limit=8192&name=images/[name].[hash:8].[ext]"],
        },
        {
          test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
          use: ["url-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"],
      alias: {
        ROOT: path.resolve(__dirname, "../src"),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          NODE_PROXY: JSON.stringify(process.env.NODE_PROXY),
          version: JSON.stringify(pkg.version),
        },
      }),
    ],
  };
  return baseConfig;
};