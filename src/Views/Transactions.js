import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  Text,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TransactionBadge,
  IdentityBadge,
  useViewport,
  theme,
} from '@aragon/ui'
import { useTransition, animated } from 'react-spring'
import Spinner from '../Components/Spinner'
import { fakeTransactInfo } from '../fakeData'
import { GU } from '../utils'

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 130px);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
  const [transactInfo, setTransactInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const { id } = useParams()
  const { above, breakpoints } = useViewport()
  useEffect(() => {
    async function loadBlockTransaction() {
      setLoading(true)
      setFailed(false)
      setTimeout(() => {
        const filteredTransact = fakeTransactInfo.filter(
          transaction => transaction.to !== null
        )
        setTransactInfo(filteredTransact)
        setLoading(false)
        setFailed(false)
      }, 500)
    }
    loadBlockTransaction()
  }, [])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(({ item, _, props }) =>
    item ? (
      <animated.div style={{ ...props, width: '95%' }}>
        <Wrapper>
          <Spinner />
        </Wrapper>
      </animated.div>
    ) : (
      <animated.div style={{ props, width: '95%' }}>
        <Text size="xlarge">Latest Transactions</Text>
        <Table
          header={
            <TableRow>
              <TableHeader title="Transaction Hash" />
              <TableHeader title="From / To" />
            </TableRow>
          }
        >
          {transactInfo.map(transaction => (
            <TableRow key={transaction.blockNumber}>
              <TableCell>
                <TransactionBadge
                  shorten
                  transaction={transaction.hash}
                  fontSize="xxsmall"
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
                  <Text>{transaction.value}</Text>
                </TableCell>
              )}
            </TableRow>
          ))}
        </Table>
      </animated.div>
    )
  )
}
export default Transactions
