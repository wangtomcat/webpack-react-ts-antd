import React, { useEffect } from 'react'
import { Button, Upload } from 'antd'
import XLSX, { readWorkbookFromLocalFile } from '../components/XLSX'
import XL from 'xlsx';

import './index.scss'

const Order = (props: any) => {

  const header = [
    {
      title: '姓名',
      // dataIndex:'name',
      key: 'name'
    },
    {
      title: '年级',
      // dataIndex:'grad',
      key: 'grad'
    },
    {
      title: '部门',
      // dataIndex:'department',
      key: 'department'
    }
  ]

  const data = [
    {
      name: "张三",
      grad: "2017级",
      department: "前端部门"
    },
    {
      name: "李四",
      grad: "2017级",
      department: "后端部门"
    }
  ]

  return <div className="orderPageWrap">
    <Button type="default" onClick={() => {
      XLSX(header, data)
    }}>下载XLSX</Button>

    <Upload onChange={(file) => readWorkbookFromLocalFile(file, (workbook: any) => { console.log(workbook) })}>
      <Button type="primary">Click to Upload</Button>

      <Button onClick={() => {
        var reader = new FileReader();
        reader.onload = function (e) {
          console.log(e)
          var data = e.target.result;
          console.log(data)
          var workbook = XL.read(data, { type: 'binary' });
          console.log(workbook)
        };
      }}>sgdf</Button>
    </Upload>
  </div>
}

export default Order
