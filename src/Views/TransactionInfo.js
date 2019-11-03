import React, { useState, useEffect } from 'react'
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
} from '@aragon/ui'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import TransactionPNG from '../assets/transaction@3x.png'
import { fakeTransactInfo } from '../fakeData'
import { GU, fromWei } from '../utils'
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
  useEffect(() => {
    async function loadTransactionInfo() {
      setLoading(true)
      setFailed(false)
      setTimeout(() => {
        const filteredTransact = fakeTransactInfo.filter(
          transaction => transaction.to !== null
        )
        setTransactInfo(filteredTransact[0])
        setLoading(false)
        setFailed(false)
      }, 500)
    }
    loadTransactionInfo()
  }, [])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderTransactionInfo(animationProps) {
    if (failed) {
      // return meaningful error state.
    }
    return (
      <animated.div style={{ animationProps, width: '95%' }}>
        <StyledCard height="auto" width="300px">
          <CardContent>
            <img
              src={TransactionPNG}
              alt="Blue block"
              width="64px"
              height="64px"
            />
            <Text size="large">Transaction Information</Text>
            <TransactionBadge transaction={transactInfo.hash} shorten />
            <div className="block-stats">
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  From
                </Text>
              </div>
              <div className="stat">
                <IdentityBadge entity={transactInfo.from} />
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  To
                </Text>
              </div>
              <div className="stat">
                <IdentityBadge entity={transactInfo.to} shorten />
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Status
                </Text>
              </div>
              <div className="stat">
                <Badge>
                  {transactInfo.transactionIndex !== null
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
                <Badge>{fromWei(transactInfo.value)}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Gas provided
                </Text>
              </div>
              <div className="stat">
                <Badge>{transactInfo.gas}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Gas Price
                </Text>
              </div>
              <div className="stat">
                <Badge>{transactInfo.gasPrice}</Badge>
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
      <animated.div style={{ ...props, width: '95%' }}>
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
