import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { categories } from '../../utils/categories';

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  Content
} from './styles'

interface ITransactionData {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: 'up' | 'down'
}

interface ICategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([])

  async function loadData() {
    const dataKey = '@gofinance:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter(
      (expensive: ITransactionData) => expensive.type === 'down'
    )

    const totalByCategory: ICategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: ITransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if (categorySum > 0) {
        let total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        total = total.replace('R$', 'R$ ');

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  )
}