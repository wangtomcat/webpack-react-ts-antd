const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const util = {
  getPages() {
    const pageDir = path.resolve(__dirname, "../src/pages");
    if (!fs.existsSync(pageDir)) {
      throw new Error("can't find pages directory.");
    }
    let files = fs.readdirSync(pageDir);
    console.log("files");
    if (!files || files.length === 0) {
      throw new Error("can't find any page");
    }
    files = files.filter((f) => {
      return fs.existsSync(pageDir + "/" + f + "/index.tsx");
    });
    if (files.length === 0) {
      throw new Error("can't find any page");
    }
    return files;
  },
  getHtmlPlugin(env) {
    const entry = {};
    const plugins = [];
    const list = util.getPages();
    for (let i = 0; i < list.length; i++) {
      const projectName = list[i];
      const template = `./src/pages/${projectName}/index.html`; // 来源
      plugins.push(
        new HtmlWebpackPlugin({
          filename: `./${projectName}.html`, // 打包后的文件
          template: template,
          data: {
            title: env === "development" ? "-本地" : "",
          },
          inject: "body",
          chunks: [projectName],
        })
      );

      entry[projectName] = [`./src/pages/${projectName}/index.tsx`];
    }
    return { entry, plugins };
  },
};

util.localIdentName = "?modules&localIdentName=[local]-[hash:base64:3]";
module.exports = util;
