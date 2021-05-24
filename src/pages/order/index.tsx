
import React from 'react'
import ReactDom from 'react-dom'

const dom = document.getElementById("root")

const Index = ()=>{
  return <div>215</div>
}


if(dom){
  ReactDom.render(<Index />,document.getElementById("root"))
}else{
  console.error("缺少id为root的dom元素，无法渲染页面")
}
