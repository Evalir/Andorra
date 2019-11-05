import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Text, Table, Button } from '@aragon/ui'

import { GU } from '../utils'

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${GU / 2}px 0 ${GU / 2}px;
  margin-bottom: ${GU}px;
`

const PaginationTable = ({ header, items, perPage = 10, children }) => {
  const [paginatedItems, setPaginatedItems] = useState([])
  const [paginationStart, setPaginationStart] = useState(1)
  const [paginationEnd, setPaginationEnd] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Pagination logic
  useEffect(() => {
    // if there are more than 10 transactions, calculate the corresponding position, otherwise, assign the array length
    let paginationEnd = items.length > 10 ? currentPage * perPage : items.length
    // if paginationEnd is bigger than the items array, assign the array length
    if (paginationEnd > items.length) {
      paginationEnd = items.length
    }
    // if there are ten items or less, pagination start will always be one
    let paginationStart = items.length > 10 ? paginationEnd - perPage + 1 : 1
    // if we are at the end of the array, we only wanna show the remaining items, not necessarily 10
    if (paginationEnd === items.length) {
      const remaining = paginationEnd % 10
      // if remaining is not at 0, there are items left
      if (remaining !== 0) {
        paginationStart = paginationEnd - remaining
      }
    }
    // but if pagination end is less than then, it means we must be at one.
    if (paginationEnd < 10) {
      paginationStart = 1
    }
    setPaginationStart(paginationStart)
    setPaginationEnd(paginationEnd)
  }, [currentPage, items.length, perPage])

  // pick the corresponding items for the array
  useEffect(() => {
    setPaginatedItems(items.slice(paginationStart - 1, paginationEnd))
  }, [items, paginationEnd, paginationStart])

  return (
    <>
      {items.length === 0 && (
        <div>
          <Text smallcaps>No items to show.</Text>
        </div>
      )}
      {items.length > 0 && (
        <>
          <PaginationWrapper>
            <Text smallcaps>
              {paginationStart} - {paginationEnd} out of {items.length}
            </Text>
            <div>
              <Button
                css={`
                  margin-right: ${GU / 2}px;
                `}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <u>&lt;</u>
              </Button>
              <Button
                css={`
                  margin-right: ${GU / 2}px;
                `}
                onClick={() => setCurrentPage(page => page - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </Button>
              <Button
                onClick={() => setCurrentPage(page => page + 1)}
                disabled={paginationEnd === items.length}
              >
                &gt;
              </Button>
              <Button
                onClick={() =>
                  setCurrentPage(() => {
                    let lastPage = Math.floor(items.length / perPage)
                    if (items.length % perPage !== 0) {
                      lastPage++
                    }
                    return lastPage
                  })
                }
                disabled={paginationEnd === items.length}
              >
                <u> &gt;</u>
              </Button>
            </div>
          </PaginationWrapper>

          <Table header={header}>{children(paginatedItems)}</Table>
        </>
      )}
    </>
  )
}

PaginationTable.propTypes = {
  header: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  perPage: PropTypes.number,
  children: PropTypes.node.isRequired,
}

export default PaginationTable
