/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
const fs = require('fs-extra');
const path = require('path');

// 读取
function read(filePath) {
  // 读取的是目录
  if (filePath.indexOf('.') === -1) {
    fs.ensureDirSync(filePath);
    const list = [];
    const dirs = fs.readdirSync(filePath);
    const files = dirs.map(dir => path.join(filePath, dir));
    for (let i = 0; i < files.length; i++) {
      const s = fs.statSync(files[i]);
      if (s.isFile()) {
        const string = fs.readFileSync(files[i], 'utf-8');
        const data = JSON.parse(string);
        list.push(data);
      }
    }

    return list;
  }

  const string = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(string);
}

// 删除
function remove(filePath) {
  const stat = fs.statSync(filePath); // fs.statSync同步读取文件状态，判断是文件目录还是文件
  // 如果是文件
  if (stat.isFile()) {
    return fs.unlinkSync(filePath);
  }

  return null;
}

// 写入
function write(filePath, data) {
  // 如果是文件
  if (filePath.indexOf('.json') !== -1) {
    fs.ensureFile(filePath, () => {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    });
    return data;
  }

  return data;
}

module.exports = {
  read,
  remove,
  write,
};