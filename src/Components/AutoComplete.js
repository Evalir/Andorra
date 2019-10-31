import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { _AutoComplete as AragonAutoComplete } from '@aragon/ui'

const StyledAutoComplete = styled(AragonAutoComplete)`
  min-height: 60px;
`
// TODO: Check autocomplete prop errors
const AutoComplete = ({ placeHolder, onChange, refNode }) => {
  return (
    <StyledAutoComplete
      wide
      placeholder={placeHolder}
      onChange={onChange}
      ref={refNode}
    />
  )
}

AutoComplete.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  refNode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
}

export default AutoComplete
