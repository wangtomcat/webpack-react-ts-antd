import React, { useEffect } from 'react'
import AsideLayout from '../AsideLayout'
import BasicLayout from '../BasicLayout'
import { withRouter } from 'react-router-dom'

import './index.scss'

const MainLayout = (props: any) => {

  return <div className="mainLayoutPageWrap">
    <div className="layout_aside">
      <AsideLayout />
    </div>
    <div className="layout_basic">
      <BasicLayout />
    </div>
  </div>
}

export default withRouter(MainLayout)
