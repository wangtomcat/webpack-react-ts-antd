import React, { useEffect, useRef } from 'react'
import { Button } from 'antd'
import Validator from '../components/Form/validator'
import Form from '../components/Form'

import './index.scss'

const Home = (props: any) => {
  const formRef: React.RefObject<Form> = useRef(null)
  console.log(props)
  const layout = [7, 16]
  const model = [
    {
      type: "input",
      name: "input",
      label: "input",
      value:"",
      layout,
      placeholder: "请输入",
      addonAfter: <span>12342</span>,
      validator: Validator.require("请输入正确值")
    },
    {
      type: "textarea",
      name: "textarea",
      label: "textarea",
      layout,
      value:"",
      placeholder: "请输入",
      validator: Validator.require("请输入正确值")
    }
  ]

  return <div className="homePageWrap">
    home
    <Button type="primary" onClick={()=>{
      const data = formRef?.current?.getData()
      console.log(data)
    }}>home</Button>
    <div>
      <Form model={model} ref={formRef} />
    </div>
  </div>
}

export default Home
