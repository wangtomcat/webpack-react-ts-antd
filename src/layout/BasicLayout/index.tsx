import React, { useEffect } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import routerConfig from '../../router'

import './index.scss'

const BasicLayout = (props: any) => {

  return <div className="basicLayoutPageWrap">
    <Switch>
      {routerConfig.map((item, index) => <Route key={index} path={item.path} exact={item.exact} component={item.component} />)}
      <Redirect exact from="/" to="/home" />
      <Redirect exact from="*" to="/home" />
    </Switch>
  </div>
}

export default BasicLayout
