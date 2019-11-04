import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Text, theme, Badge, EmptyStateCard, IconError } from '@aragon/ui'
import Web3 from 'web3'
import AnimatedTable from '../Components/AnimatedTable'

import { useTransition, animated } from 'react-spring'
import Switch from '../Components/Switch'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import { GU } from '../utils'
import { getInjectedProvider, fetchBlocks } from '../web3-utils'

const RealtimeSwitchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

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
  const [realtime, setRealtime] = useState(false)
  const [lastBlockNumber, setLastBlockNumber] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const ref = useRef()
  const fetchBlockNumber = useCallback(async () => {
    setLoading(true)
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const blockNumber = await web3.eth.getBlockNumber()
      setLastBlockNumber(blockNumber)
    } catch (error) {
      // handle error with retry
      setFailed(true)
    }
  }, [])

  useEffect(() => {
    fetchBlockNumber()
  }, [fetchBlockNumber])

  useEffect(() => {
    if (realtime && lastBlockNumber) {
      try {
        const web3 = new Web3(
          getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
        )
        const subscription = web3.eth.subscribe(
          'newBlockHeaders',
          async (err, newBlock) => {
            if (err) {
              // do stuff
            }
            setLastBlockNumber(newBlock.number)
          }
        )
        ref.current = subscription
      } catch (e) {
        console.log(e)
      }
    }
    return () =>
      ref.current
        ? ref.current.unsubscribe((err, success) => {
            if (err) {
              console.log(err)
            } else {
              console.log('success!', success)
            }
          })
        : undefined
  }, [lastBlockNumber, realtime])

  useEffect(() => {
    async function fetchRequestedBlocks() {
      if (lastBlockNumber) {
        try {
          const web3 = new Web3(
            getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
          )
          let blocks = await fetchBlocks(
            web3,
            lastBlockNumber - 10,
            lastBlockNumber
          )
          blocks = blocks.reverse()
          setBlocks(blocks)
        } catch (error) {
          setFailed(true)
        }
        setLoading(false)
      }
    }
    fetchRequestedBlocks()
  }, [lastBlockNumber])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderBlocks(animationProps) {
    if (failed) {
      return (
        <SpinnerWrapper key={2}>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching transactions."
            onActivate={() => fetchBlockNumber()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }

    return (
      <animated.div style={{ ...animationProps, width: '95%' }} key={2}>
        <RealtimeSwitchWrapper>
          <Text smallcaps>realtime updates</Text>
          <Switch
            onChange={() => {
              setRealtime(on => !on)
            }}
            on={realtime}
          />
        </RealtimeSwitchWrapper>
        <Wrapper>
          <div className="ether-info">
            <AnimatedTable items={blocks} title="Block" />
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
      </animated.div>
    )
  }

  return transitions.map(({ item: isLoading, _, props }) =>
    isLoading ? (
      <animated.div style={{ ...props, width: '95%' }} key={1}>
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      </animated.div>
    ) : (
      renderBlocks(props)
    )
  )
}

export default Index
