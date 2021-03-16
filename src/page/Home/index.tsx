import React, { useEffect } from 'react'
import { Button } from 'antd'

import './index.scss'

const Home = (props:any)=>{
  console.log(props)
  return <div className="homePageWrap">
    home
    <Button type="primary">home</Button>
  </div>
}

export default Home
