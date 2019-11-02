import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import Index from './Views/index'
import BlockInfo from './Views/BlockInfo'
import Transactions from './Views/Transactions'

const App = () => {
  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: 'translate3d(0, 0%,0)', opacity: 0 },
    from: { transform: 'translate3d(0, 80%,0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0%,0)', opacity: 1 },
    leave: { transform: 'translate3d(0, -90%,0)', opacity: 0 },
  })
  return transitions.map(({ item, key, props }) => (
    <animated.div
      style={{
        ...props,
        position: 'absolute',
        width: '95%',
      }}
      key={key}
    >
      <Switch location={item}>
        <Route exact component={BlockInfo} path="/blockinfo/:id" />
        <Route exact component={Transactions} path="/transactions" />
        <Route exact component={Index} path="/" />
      </Switch>
    </animated.div>
  ))
}

export default App
