/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = `58881`; // 这个要跟 "./webpack.dev.js"里的端口配置一致
const http = require('http').createServer(app);

const bin = require('./bin');

/**
 * 本地数据模拟
 * @param prefix
 * @param port
 * @returns {Function}
 */
const localMock = function (prefix) {
  return function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
      res.status(200).send();
    } else {
      if (!prefix) {
        res.status(500).send({ error: '没有设置好prefix' });
        return;
      }

      const url = req.url;
      const _p = url.indexOf('?') !== -1 ? url.split('?')[0] : url;
      const pathname = _p.endsWith('.json') ? _p : `${_p}.json`;
      const fileName = `./mock/${pathname}`;
      const filePath = path.resolve(__dirname, fileName);

      let result = {};

      try {
        // 读
        if (req.method === 'GET') {
          result = bin.read(filePath);
        }

        // 写
        if (req.method === 'POST') {
          result = bin.write(filePath, req.body);
        }

        // 删除文件
        if (req.method === 'DELETE') {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.log(err);
      }

      res.status(200).send(result);
    }
  };
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', localMock('/')); // 数据代理到本地模拟

http.listen(port, () => {
  console.log(`本地开发数据mock服务器已经启动 http://localhost:${port}`);
});