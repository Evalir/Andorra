import React, { useState } from 'react'
import { TabBar } from '@aragon/ui'

const AppTabBar = () => {
  const [selected, setSelected] = useState(0)
  function handleTabChange(index) {
    setSelected(index)
    // TODO: Navigate to desired route using history
  }
  return (
    <TabBar
      items={['Blocks', 'Pending Transactions']}
      selected={selected}
      onChange={handleTabChange}
    />
  )
}

export default AppTabBar
