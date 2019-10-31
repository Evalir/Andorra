import React from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Text,
  Badge,
} from '@aragon/ui'
import PropTypes from 'prop-types'

const AnimatedTable = ({ items, title }) => (
  <Table
    header={
      <TableRow>
        <TableHeader title={title} />
      </TableRow>
    }
  >
    {items.map((item, index) => (
      <TableRow key={index}>
        <TableCell>
          <Text>{item.number}</Text>
        </TableCell>
        <TableCell>
          <Text>Miner {item.miner}</Text>
        </TableCell>
        <TableCell>
          <Badge.Info>{item.reward} ETH</Badge.Info>
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
