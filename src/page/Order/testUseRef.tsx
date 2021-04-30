import React, { useEffect, useRef } from 'react'
import { Button, Upload } from 'antd'
import AddCom from './components/add'


const mapList = [
  {
    key: "1",
    value: {}
  },
  {
    key: "2",
    value: {}
  },
  {
    key: "3",
    value: {}
  }
]

const Index = (props: any) => {
  const refMap = useRef([])

  const getData = ()=>{
    const data = []
    mapList.map(item=>{
      let objValue = refMap?.current[item.key]?.getData()
      data.push(objValue)
    })
    console.log(data)
  }

  return <div className="testUseRefPage">
    <div>使用useRef数组的方式遍历组件并通过ref取值</div>
    {
      mapList.map((item,index) => <AddCom key={index} num={index} ref={f => { refMap.current[item.key] = f }} />)
    }
    <Button type="primary" onClick={getData}>获取各组件的值</Button>
  </div>
}

export default Index
