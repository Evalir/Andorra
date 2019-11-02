import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Text, theme, Badge } from '@aragon/ui'
import { useSpring, animated } from 'react-spring'
import AnimatedTable from '../Components/AnimatedTable'
import { fakeBlocks, fakeBlockInfo } from '../fakeData'
import { GU } from '../utils'

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
  const props = useSpring({
    opacity: 1,
    transform: `scale(1) translateY(0%)`,
    from: { opacity: 0.5, transform: `scale(0.95) translateY(10%)` },
  })
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
