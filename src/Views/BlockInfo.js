import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  Card,
  EmptyStateCard,
  IconError,
  Text,
  Badge,
  theme,
  Button,
} from '@aragon/ui'
import { useTransition, animated } from 'react-spring'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import { GU } from '../utils'
import { getInjectedProvider } from '../web3-utils'
import BlockPNG from '../assets/block@3x.png'
import history from '../history'
import Web3 from 'web3'

const StyledCard = styled(Card)`
  margin: 0 auto;
`

const StyledButton = styled(Button)`
  margin: ${GU}px 0 0 0;
`

const CardContent = styled.div`
  display: flex;
  padding: ${2 * GU}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .block-stats {
    margin-top: ${GU}px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${2 * GU}px;
    .stat {
      grid-column: span 1;
    }
  }
`

const BlockInfo = () => {
  // TODO: Implement loading and failed states
  const [blockData, setBlockData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const { id } = useParams()
  const getBlockData = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const wsWeb3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const block = await wsWeb3.eth.getBlock(id)
      setBlockData(block)

      setFailed(false)
    } catch (error) {
      // handle error with retry
      setFailed(true)
    }
    setLoading(false)
  }, [id])

  // get block data
  useEffect(() => {
    getBlockData()
  }, [getBlockData, id])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderBlockInfo(animationProps) {
    if (failed) {
      return (
        <SpinnerWrapper key={2}>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching the requested block."
            onActivate={() => getBlockData()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }

    return (
      <animated.div style={{ animationProps, width: '95%' }} key={2}>
        <StyledCard height="auto">
          <CardContent>
            <img src={BlockPNG} alt="Blue block" width="64px" height="64px" />
            <Text size="large">Block Information</Text>
            <Badge>{Number(id) + 800452}</Badge>
            <div className="block-stats">
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Timestamp
                </Text>
              </div>
              <div className="stat">
                <Badge>
                  {blockData && new Date(blockData.timestamp * 1000).getHours()}{' '}
                  hours ago
                </Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Gas Used
                </Text>
              </div>
              <div className="stat">
                <Badge>{blockData && blockData.gasUsed}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Gas Limit
                </Text>
              </div>
              <div className="stat">
                <Badge>{blockData && blockData.gasLimit}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Difficulty
                </Text>
              </div>
              <div className="stat">
                <Badge>{blockData && blockData.difficulty}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Number of transactions
                </Text>
              </div>
              <div className="stat">
                <Badge>{blockData && blockData.transactions.length}</Badge>
              </div>
            </div>
            <StyledButton
              wide
              mode="strong"
              onClick={() => history.push(`/transactions/${id}`)}
            >
              See transactions from this block
            </StyledButton>
            <StyledButton
              wide
              mode="secondary"
              onClick={() => history.goBack()}
            >
              Go Back
            </StyledButton>
          </CardContent>
        </StyledCard>
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
      renderBlockInfo(props)
    )
  )
}

export default BlockInfo
