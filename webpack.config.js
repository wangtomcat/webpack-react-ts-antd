const path = require('path'); //使用__dirname变量，获取当前文件的绝对路径，避免在不同操作系统之间的路径问题
const HtmlWebpackPlugin = require('html-webpack-plugin');//使webpack自动按照模板将Html文件添加进打包目录中
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  mode: 'development',//现在为开发环境
  entry: './src/index.tsx',
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less", ".css", ".scss",],
    alias: {
      '@src': path.join(__dirname, './src'),
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    open: true,
    hot: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: [/node_modules/],//不会去翻译node_modules中的文件
        loader: "babel-loader",
        options: {
          "presets": [["@babel/preset-env", {
            useBuiltIns: 'usage'//按需加入es6新特性
          }],
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.ts[x]?$/,
        exclude: [/node_modules/],
        use: ["babel-loader", "awesome-typescript-loader"]
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        // exclude: [/node_modules/],
        use: ["style-loader", "css-loader", {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
              modifyVars: {
                'primary-color': '#1DA57A',
                'link-color': '#1DA57A',
                'border-radius-base': '2px',
              },
              javascriptEnabled: true,
            },
          }
        }
        ]
      },
      {
        test: /\.scss$/,
        // exclude: [/node_modules/],
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png|gif|jpeg|icon|ttf|woff|eot|woff2)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 20480
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'public/index.html'//html模板
  }), new CleanWebpackPlugin()],//打包前，帮助将dist内的文件清除掉
  output: {
    path: path.resolve(__dirname, "build"),//打包文件导出
    filename: '[name].[hash].bundle.js',//文件名
  }
}