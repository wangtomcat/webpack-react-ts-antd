import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react'
import { Button, Upload } from 'antd'


const Index = (props: any, ref) => {
  const [value, setValue] = useState(12)
  const { num } = props

  const getData = () => {
    return value + num
  }

  useImperativeHandle(ref, () => ({ getData }))

  return <div className="addComponent">
    add组件
  </div>
}

const IndexPage = forwardRef(Index)

export default IndexPage

