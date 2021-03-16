import React, { useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'

import './index.scss'


const AsideLayout = (props:any)=>{
  return <div className="asideLayoutPageWrap">
    <Link to="/home">Home</Link>
    <Link to="/order">Order</Link>
  </div>
}

export default withRouter(AsideLayout)
