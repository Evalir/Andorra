import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Text, Badge } from '@aragon/ui'
import AnimatedTable from '../Components/AnimatedTable'
import AutoComplete from '../Components/AutoComplete'
import { fakeBlocks } from '../fakeData'
import { useSpring, animated } from 'react-spring'

const Wrapper = styled.div`
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
  const [searchTerm, setSearchTerm] = useState(null)
  const searchRef = useRef()
  const props = useSpring({
    opacity: 1,
    transform: `scale(1) translateY(0%)`,
    from: { opacity: 0.5, transform: `scale(0.95) translateY(10%)` },
  })
  return (
    <animated.div style={props}>
      <Wrapper>
        <div className="search">
          <AutoComplete
            placeholder="Search block by number"
            onChange={setSearchTerm}
            refNode={searchRef}
          />
        </div>
        <div className="ether-info">
          <AnimatedTable items={fakeBlocks} title="Latest Blocks" />
        </div>
        <div className="ether-info">
          <Text.Block>Stats</Text.Block>
          <div className="stat-row">
            <Text smallcaps>ETH Price: </Text> <Badge>$2323</Badge>
          </div>
          <div className="stat-row">
            <Text smallcaps>Market Cap: </Text>{' '}
            <Badge>${Math.floor(Math.random() * 100000000)}</Badge>
          </div>
        </div>
      </Wrapper>
    </animated.div>
  )
}

export default Index
