import React, { useEffect } from 'react'
import { Button } from 'antd'
import XLSX from '../components/XLSX'

import './index.scss'

const Order = (props:any)=>{

  const header = [
    {
      title:'姓名',
      // dataIndex:'name',
      key:'name'
    },
    {
      title:'年级',
      // dataIndex:'grad',
      key:'grad'
    },
    {
      title:'部门',
      // dataIndex:'department',
      key:'department'
    }
  ]

  const data = [
    {
      name:"张三",
      grad:"2017级",
      department:"前端部门"
    },
    {
      name:"李四",
      grad:"2017级",
      department:"后端部门"
    }
  ]

  return <div className="orderPageWrap">
    <Button type="default" onClick={()=>{
      XLSX(header,data)
    }}>下载XLSX</Button>
  </div>
}

export default Order
