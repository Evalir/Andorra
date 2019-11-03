import React, { Fragment, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Text, theme, Badge } from '@aragon/ui'
import Web3 from 'web3'
import range from 'lodash.range'
import AnimatedTable from '../Components/AnimatedTable'

import { fakeBlocks } from '../fakeData'
import { GU } from '../utils'
import { getInjectedProvider } from '../web3-utils'

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  height: 100%;
  padding-top: 2em;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2em;

  .ether-info {
    grid-column: span 1;
    .stat-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 0 0 ${GU}px 0;
    }
  }
  @media screen and (min-width: 728px) {
    grid-template-columns: 70% 1fr;
    .search {
      grid-column: span 2;
    }
  }
`

const Index = () => {
  const [blocks, setBlocks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  const fetchBlocks = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const block = await web3.eth.getBlockNumber()
      const blockBatch = new web3.eth.BatchRequest()
      const blockRange = range(block - 10, block)
      blockRange.forEach(blockNumber =>
        blockBatch.add(web3.eth.getBlock.request(blockNumber))
      )
      blockBatch.execute()
    } catch (error) {
      // handle error with retry
      setFailed(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchBlocks()
  }, [fetchBlocks])
  return (
    <Fragment>
      {/* <animated.div style={props}> */}
      <Wrapper>
        <div className="ether-info">
          <AnimatedTable items={fakeBlocks} title="Block" />
        </div>
        <div className="ether-info">
          <Text.Block>Stats</Text.Block>
          <div className="stat-row">
            <Text size="small" color={theme.textSecondary}>
              ETH Price:{' '}
            </Text>{' '}
            <Badge>$2323</Badge>
          </div>
          <div className="stat-row">
            <Text size="small" color={theme.textSecondary}>
              Market Cap:{' '}
            </Text>{' '}
            <Badge>${Math.floor(Math.random() * 100000000)}</Badge>
          </div>
        </div>
      </Wrapper>
      {/* </animated.div> */}
    </Fragment>
  )
}

export default Index
