import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  Text,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  IdentityBadge,
  useViewport,
  theme,
} from '@aragon/ui'
import { useTransition, animated } from 'react-spring'
import Tag from '../Components/Tag'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import { fakeTransactInfo } from '../fakeData'
import { fromWei, GU } from '../utils'

const AddressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .trans-details {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${GU}px;
  }
`

const Transactions = () => {
  const [transactions, setTransactions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const { id } = useParams()
  const { above, breakpoints } = useViewport()
  useEffect(() => {
    async function loadBlockTransactions() {
      setLoading(true)
      setFailed(false)
      setTimeout(() => {
        const filteredTransact = fakeTransactInfo.filter(
          transaction => transaction.to !== null
        )
        setTransactions(filteredTransact)
        setLoading(false)
        setFailed(false)
      }, 500)
    }
    loadBlockTransactions()
  }, [])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderTransactions(animationProps) {
    if (failed) {
      // return a meaningful error.
    }
    return (
      <animated.div style={{ animationProps, width: '95%' }}>
        <Text size="xlarge">Latest Transactions</Text>
        <Table
          header={
            <TableRow>
              <TableHeader title="Transaction Hash" />
              <TableHeader title="From / To" />
              {above(breakpoints.small) && <TableHeader title="Value in Eth" />}
            </TableRow>
          }
        >
          {transactions.map(transaction => (
            <TableRow key={transaction.blockNumber}>
              <TableCell>
                <Tag
                  shorten
                  text={transaction.hash}
                  location={`/transaction/${transaction.hash}`}
                />
              </TableCell>
              <TableCell>
                <AddressWrapper>
                  <div className="trans-details">
                    <Text smallcaps color={theme.textSecondary} weight="bold">
                      From
                    </Text>{' '}
                    <IdentityBadge
                      shorten
                      entity={transaction.from}
                      fontSize="xxsmall"
                    />
                  </div>
                  <div className="trans-details">
                    <Text smallcaps color={theme.textSecondary} weight="bold">
                      To
                    </Text>{' '}
                    <IdentityBadge
                      shorten
                      entity={transaction.to}
                      fontSize="xxsmall"
                    />
                  </div>
                </AddressWrapper>
              </TableCell>
              {above(breakpoints.small) && (
                <TableCell>
                  <Text smallcaps>$ {fromWei(transaction.value)}</Text>
                </TableCell>
              )}
            </TableRow>
          ))}
        </Table>
      </animated.div>
    )
  }

  return transitions.map(({ item: isLoading, _, props }) =>
    isLoading ? (
      <animated.div style={{ ...props, width: '95%' }}>
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      </animated.div>
    ) : (
      renderTransactions(props)
    )
  )
}
export default Transactions
