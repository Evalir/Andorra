import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { AppBar, Main, AppView } from '@aragon/ui'

import TabBar from './Components/TabBar'
import Index from './Views/index'
import BlockInfo from './Views/BlockInfo'
import Transactions from './Views/Transactions'
import history from './history'

const App = () => {
  return (
    <>
      <Main>
        <AppView appBar={<AppBar title="Andorra" tabs={<TabBar />} />}>
          <Router history={history}>
            <Switch>
              <Route exact component={BlockInfo} path="/blockinfo/:id" />
              <Route exact component={Transactions} path="/transactions" />
              <Route exact component={Index} path="/" />
            </Switch>
          </Router>
        </AppView>
      </Main>
    </>
  )
}

export default App
