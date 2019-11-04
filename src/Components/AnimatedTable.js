import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Badge,
  IdentityBadge,
  theme,
  useViewport,
} from '@aragon/ui'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.accent};
`

const AnimatedTable = ({ items, title }) => {
  const { above, breakpoints } = useViewport()
  return (
    <Table
      header={
        <TableRow>
          <TableHeader title={title} />
          <TableHeader title={'Miner'} />
          {above(breakpoints.small) && (
            <TableHeader title={'No. of transactions'} />
          )}
        </TableRow>
      }
    >
      {items.map((item, index) => (
        <TableRow key={index}>
          <TableCell>
            <StyledLink to={`/blockinfo/${item.number}`}>
              {item.number}
            </StyledLink>
          </TableCell>
          <TableCell>
            <IdentityBadge entity={item.miner} />
          </TableCell>
          {above(breakpoints.small) && (
            <TableCell>
              <Badge>{item.transactions.length} Transactions</Badge>
            </TableCell>
          )}
        </TableRow>
      ))}
    </Table>
  )
}

AnimatedTable.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default AnimatedTable
