import React, { useState, useEffect, useCallback } from 'react'
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
  EmptyStateCard,
  IconError,
} from '@aragon/ui'
import Web3 from 'web3'
import { useTransition, animated } from 'react-spring'
import Tag from '../Components/Tag'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import { getInjectedProvider } from '../web3-utils'
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

  const fetchTransactionsFromBlock = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const block = await web3.eth.getBlock(id, true)
      const { transactions } = block
      const fetchedTransactions = transactions.filter(
        transaction => transaction.value > 0 && transaction.to !== null
      )
      setTransactions(fetchedTransactions)
    } catch (e) {
      // catch error state
      setFailed(true)
    }
    setLoading(false)
    setFailed(false)
  }, [id])

  useEffect(() => {
    fetchTransactionsFromBlock()
  }, [fetchTransactionsFromBlock, id])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderTransactions(animationProps) {
    if (failed) {
      return (
        <SpinnerWrapper key={2}>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching transactions."
            onActivate={() => fetchTransactionsFromBlock()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }
    return (
      <animated.div style={{ animationProps, width: '95%' }} key={2}>
        <Text size="xlarge">Latest Transactions</Text>
        {transactions.length === 0 && (
          <div>
            <Text smallcaps>No transactions to show</Text>
          </div>
        )}
        {transactions.length > 0 && (
          <Table
            header={
              <TableRow>
                <TableHeader title="Transaction Hash" />
                <TableHeader title="From / To" />
                {above(breakpoints.small) && (
                  <TableHeader title="Value in Eth" />
                )}
              </TableRow>
            }
          >
            {transactions.map(transaction => (
              <TableRow key={transaction.hash}>
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
        )}
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
      renderTransactions(props)
    )
  )
}
export default Transactions
