import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import {
  Card,
  Button,
  Badge,
  Text,
  theme,
  TransactionBadge,
  IdentityBadge,
  IconError,
  EmptyStateCard,
} from '@aragon/ui'
import Web3 from 'web3'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import TransactionPNG from '../assets/transaction@3x.png'
import { GU, fromWei } from '../utils'
import { getInjectedProvider } from '../web3-utils'
import history from '../history'

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

const TransactionInfo = () => {
  const [transactInfo, setTransactInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const { hash } = useParams()

  const loadTransactionInfo = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const transaction = await web3.eth.getTransaction(hash)
      if (!transaction) {
        setFailed(true)
      } else {
        setTransactInfo(transaction)
        setFailed(false)
      }
    } catch (error) {
      // handle error with retry
      setFailed(true)
    }
    setLoading(false)
  }, [hash])
  useEffect(() => {
    loadTransactionInfo()
  }, [loadTransactionInfo, hash])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderTransactionInfo(animationProps) {
    if (failed) {
      return (
        <SpinnerWrapper key={2}>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching the requested transaction."
            onActivate={() => loadTransactionInfo()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }
    return (
      <animated.div style={{ animationProps, width: '95%' }} key={2}>
        <StyledCard height="auto" width="300px">
          <CardContent>
            <img
              src={TransactionPNG}
              alt="Blue block"
              width="64px"
              height="64px"
            />
            <Text size="large">Transaction Information</Text>
            <TransactionBadge
              transaction={transactInfo && transactInfo.hash}
              shorten
            />
            <div className="block-stats">
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  From
                </Text>
              </div>
              <div className="stat">
                <IdentityBadge entity={transactInfo && transactInfo.from} />
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  To
                </Text>
              </div>
              <div className="stat">
                <IdentityBadge
                  entity={transactInfo && transactInfo.to}
                  shorten
                />
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Status
                </Text>
              </div>
              <div className="stat">
                <Badge>
                  {transactInfo && transactInfo.transactionIndex !== null
                    ? transactInfo.gas === transactInfo.gasPrice
                      ? 'Failed'
                      : 'Success'
                    : 'Pending'}
                </Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Transaction Value
                </Text>
              </div>
              <div className="stat">
                <Badge>{transactInfo && fromWei(transactInfo.value)}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Gas Price
                </Text>
              </div>
              <div className="stat">
                <Badge>{transactInfo && transactInfo.gas}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  From Block
                </Text>
              </div>
              <div className="stat">
                <Badge>{transactInfo.blockNumber}</Badge>
              </div>
            </div>

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

  return transitions.map(({ item: isLoading, key, props }) =>
    isLoading ? (
      <animated.div style={{ ...props, width: '95%' }} key={1}>
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      </animated.div>
    ) : (
      renderTransactionInfo(props)
    )
  )
}

export default TransactionInfo
