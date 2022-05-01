import React from 'react'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
  Icon
} from './styles'

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://github.com/pedrobovolindavila.png' }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <Username>Pedro</Username>
            </User>
          </UserInfo>

          <Icon name="power" />

        </UserWrapper>
      </Header>
    </Container>
  )
}