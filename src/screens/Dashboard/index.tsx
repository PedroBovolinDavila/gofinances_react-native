import React, { useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

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
} from './styles'

export interface IDataListProps extends ITransactionCardProps {
  id: string
}

export function Dashboard() {
  const [data, setData] = useState<IDataListProps[]>([])

  async function loadTransactions() {
    const dataKey = '@gofinance:transactions'

    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response!) : []

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (item: IDataListProps) => {
        let amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        amount = amount.replace('R$', 'R$ ');

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      }
    );

    setData(transactionsFormatted)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))


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