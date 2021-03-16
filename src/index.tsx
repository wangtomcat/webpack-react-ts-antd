import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import { HashRouter,withRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import 'antd/dist/antd.less'
import './index.scss'

if(document.getElementById('root')){
  ReactDom.render(
    <HashRouter>
      <MainLayout/>
    </HashRouter>,
    document.getElementById('root')
  )
}