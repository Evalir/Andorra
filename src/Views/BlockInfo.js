import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  Card,
  EmptyStateCard,
  IconError,
  Text,
  Badge,
  theme,
  Button,
} from '@aragon/ui'
import { GU } from '../utils'
import { fakeBlockInfo } from '../fakeData'
import BlockPNG from '../assets/block@3x.png'
import history from '../history'

const StyledCard = styled(Card)`
  margin: 0 auto;
`

const StyledButton = styled(Button)`
  margin: ${GU}px 0 0 0;
`

const CardContent = styled.div`
  display: flex;
  padding: ${2 * GU}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .block-stats {
    margin-top: ${GU}px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${2 * GU}px;
    .stat {
      grid-column: span 1;
    }
  }
`

const BlockInfo = () => {
  // TODO: Implement loading and failed states
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const { id } = useParams()
  // TODO: Implement animations for loading

  return (
    <Fragment>
      {!failed && (
        <StyledCard height="auto">
          <CardContent>
            <img src={BlockPNG} alt="Blue block" width="64px" height="64px" />
            <Text size="large">Block Information</Text>
            <Badge>{Number(id) + 800452}</Badge>
            <div className="block-stats">
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Timestamp
                </Text>
              </div>
              <div className="stat">
                <Badge>{fakeBlockInfo.timestamp}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Gas Used
                </Text>
              </div>
              <div className="stat">
                <Badge>{fakeBlockInfo.gasUsed}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Gas Limit
                </Text>
              </div>
              <div className="stat">
                <Badge>{fakeBlockInfo.gasLimit}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Difficulty
                </Text>
              </div>
              <div className="stat">
                <Badge>{fakeBlockInfo.difficulty}</Badge>
              </div>
              <div className="stat">
                <Text smallcaps color={theme.textSecondary}>
                  Block Reward
                </Text>
              </div>
              <div className="stat">
                <Badge>{fakeBlockInfo.blockReward}</Badge>
              </div>
            </div>
            <StyledButton
              wide
              mode="strong"
              onClick={() => history.push(`/transactions/${id}`)}
            >
              See transactions from this block
            </StyledButton>
            <StyledButton
              wide
              mode="secondary"
              onClick={() => history.goBack()}
            >
              Go Back
            </StyledButton>
          </CardContent>
        </StyledCard>
      )}
      {failed && (
        <EmptyStateCard
          actionText="Try Again"
          text="A problem ocurred while fetching the requested block."
          icon={() => <IconError />}
        />
      )}
    </Fragment>
  )
}

export default BlockInfo
