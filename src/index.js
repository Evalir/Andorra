import React from 'react'
import ReactDOM from 'react-dom'
import { AppBar, Main, AppView, Button } from '@aragon/ui'
import { Router } from 'react-router-dom'
import App from './App'
import TabBar from './Components/TabBar'
import history from './history'
import GlobalErrorBoundary from './Components/GlobalErrorBoundary'

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => (
  <Main>
    <GlobalErrorBoundary>
      <AppView
        appBar={
          <AppBar
            title="Andorra"
            tabs={<TabBar />}
            endContent={
              <Button.Anchor
                mode="strong"
                target="_blank"
                href="https://github.com/Evalir/Andorra"
              >
                See the code
              </Button.Anchor>
            }
          />
        }
      >
        <Router history={history}>{children}</Router>
      </AppView>
    </GlobalErrorBoundary>
  </Main>
)

const ProvidedApp = () => (
  <Provider>
    <App />
  </Provider>
)

ReactDOM.render(<ProvidedApp />, document.getElementById('root'))
