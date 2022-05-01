import React from 'react'

import { ITransactionCardProps } from '../../components/TransactionCard'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoggoutButton
} from './styles'

export interface IDataListProps extends ITransactionCardProps {
  id: string
}

export function Dashboard() {
  const data: IDataListProps[] = [
    {
      id: '1',
      amount: "R$ 12,000.000",
      category: {
        name: 'Venda',
        icon: 'dollar-sign'
      },
      date: "12/04/2022",
      type: 'positive',
      title: "Venda de website"
    },
    {
      id: '2',
      amount: "R$ 59,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      type: 'negative',
      date: "10/04/2022",
      title: "Hamburgueria Pizzy"
    },
    {
      id: '3',
      amount: "R$ 1.200,00",
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      type: 'negative',
      date: "08/04/2022",
      title: "Aluguel do apartamento"
    }
  ]

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

          <LoggoutButton>
            <Icon name="power" />
          </LoggoutButton>

        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entrada"
          amount="R$ 14.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransaction="Última saida dia 13 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 16 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />


      </Transactions>
    </Container >
  )
}