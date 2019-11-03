import React, { useState } from 'react'
import { TabBar } from '@aragon/ui'
import history from '../history'

const AppTabBar = () => {
  const [selected, setSelected] = useState(0)
  function handleTabChange(index) {
    setSelected(index)
    switch (index) {
      case 0:
        history.push('/')
        break
      case 1:
        // replace this one with the latest block available
        history.push('/transactions/1')
        break
      default:
        throw new Error(
          'Tab Index route change not implemented on the AppTabBar component.'
        )
    }
  }
  return (
    <TabBar
      items={['Blocks', 'Transactions']}
      selected={selected}
      onChange={handleTabChange}
    />
  )
}

export default AppTabBar
