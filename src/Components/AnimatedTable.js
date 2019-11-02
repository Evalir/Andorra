import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Text,
  Badge,
  theme,
} from '@aragon/ui'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.accent};
`

const AnimatedTable = ({ items, title }) => (
  <Table
    header={
      <TableRow>
        <TableHeader title={title} />
        <TableHeader title={'Miner'} />
        <TableHeader title={'No. of transactions'} />
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
          <Text>Miner {item.miner}</Text>
        </TableCell>
        <TableCell>
          <Badge>{Math.floor(Math.random() * 300)} Transactions</Badge>
        </TableCell>
      </TableRow>
    ))}
  </Table>
)

AnimatedTable.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default AnimatedTable
