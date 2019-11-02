import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Text,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TransactionBadge,
  IdentityBadge,
} from '@aragon/ui'
import { useTransition, animated } from 'react-spring'
import Spinner from '../Components/Spinner'
import { fakeTransactInfo } from '../fakeData'

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 130px);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Transactions = () => {
  const [transactInfo, setTransactInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  // TODO: Implement loading failed states
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    async function loadBlockTransaction() {
      setLoading(true)
      setTimeout(() => {
        const filteredTransact = fakeTransactInfo.filter(
          transaction => transaction.to !== null
        )
        setTransactInfo(filteredTransact)
        setLoading(false)
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
            </TableRow>
          }
        >
          {transactInfo.map(transaction => (
            <TableRow key={transaction.hash}>
              <TableCell>
                <TransactionBadge shorten transaction={transaction.hash} />
              </TableCell>
              <TableCell>
                <div>
                  <div>
                    <Text>From</Text>{' '}
                    <IdentityBadge shorten entity={transaction.from} />
                  </div>
                  <div>
                    <Text>To</Text>{' '}
                    <IdentityBadge shorten entity={transaction.to} />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Text>{transaction.value}</Text>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </animated.div>
    )
  )
}
export default Transactions
