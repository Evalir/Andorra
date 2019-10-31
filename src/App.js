import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index from './Views/index'
import { AppBar, Main, AppView } from '@aragon/ui'
import TabBar from './Components/TabBar'

const App = () => {
  return (
    <>
      <Main>
        <AppView appBar={<AppBar title="Andorra" tabs={<TabBar />} />}>
          <Router>
            <Switch>
              <Route exact component={Index} path="/" />
            </Switch>
          </Router>
        </AppView>
      </Main>
    </>
  )
}

export default App
