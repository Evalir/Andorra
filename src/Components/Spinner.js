import styled, { keyframes } from 'styled-components'
import { theme } from '@aragon/ui'

const donutSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`

const Spinner = styled.div`
  display: block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${theme.accent};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${donutSpin} 1.2s linear infinite;
`

export default Spinner
