import React, { useState, useCallback, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'

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
  LoadContainer,
  LogoutButton
} from './styles'

import { useTheme } from 'styled-components'

export interface IDataListProps extends ITransactionCardProps {
  id: string
}

interface IHighlightCardProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightCardData {
  entries: IHighlightCardProps;
  expensives: IHighlightCardProps;
  total: IHighlightCardProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<IDataListProps[]>([])
  const [highlightCardData, setHighlightCardData] = useState<IHighlightCardData>({} as IHighlightCardData);

  const { signOut, user } = useAuth();

  const theme = useTheme();

  function getLastTransactionDate(
    collection: IDataListProps[],
    type: 'up' | 'down'
  ) {
    const lastTransaction = new Date(Math.max.apply(Math,
      collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())
    ))

    const lastTransactionFormatted = `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`

    return lastTransactionFormatted
  }

  async function loadTransactions() {
    const dataKey = '@gofinance:transactions'
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response!) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (item: IDataListProps) => {
        if (item.type === 'up') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

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

    let entriesTotalFormatted = entriesTotal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    entriesTotalFormatted = entriesTotalFormatted.replace('R$', 'R$ ');

    let expensiveTotalFormatted = expensiveTotal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    expensiveTotalFormatted = expensiveTotalFormatted.replace('R$', 'R$ ');

    let total = (entriesTotal - expensiveTotal)

    let totalFormatted = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    totalFormatted = totalFormatted.replace('R$', 'R$ ');

    const lastTransactionEntries = getLastTransactionDate(transactions, 'up')
    const lastTransactionExprensives = getLastTransactionDate(transactions, 'down')
    const totalInterval = `01 a ${lastTransactionExprensives}`

    setHighlightCardData({
      entries: {
        amount: entriesTotalFormatted,
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensiveTotalFormatted,
        lastTransaction: `Última saida dia ${lastTransactionExprensives}`
      },
      total: {
        amount: totalFormatted.toString(),
        lastTransaction: totalInterval
      }
    })
    setTransactions(transactionsFormatted)
    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
          :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo
                    source={{ uri: user.photo }}
                  />
                  <User>
                    <UserGreeting>Olá, </UserGreeting>
                    <Username>{user.name}</Username>
                  </User>
                </UserInfo>

                <LogoutButton
                  activeOpacity={.8}
                  onPress={signOut}
                >
                  <Icon name="power" />
                </LogoutButton>

              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                title="Entrada"
                amount={highlightCardData.entries.amount}
                lastTransaction={highlightCardData.entries.lastTransaction}
                type="up"
              />
              <HighlightCard
                title="Saidas"
                amount={highlightCardData.expensives.amount}
                lastTransaction={highlightCardData.expensives.lastTransaction}
                type="down"
              />
              <HighlightCard
                title="Total"
                amount={highlightCardData.total.amount}
                lastTransaction={highlightCardData.total.lastTransaction}
                type="total"
              />
            </HighlightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionsList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />


            </Transactions>
          </>
      }
    </Container >
  )
}