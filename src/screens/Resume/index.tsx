import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFValue } from 'react-native-responsive-fontsize';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { VictoryPie } from 'victory-native'

import { categories } from '../../utils/categories';

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
} from './styles'

import { useTheme } from 'styled-components'

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
  totalFormatted: string;
  total: number;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([])

  const theme = useTheme();

  async function loadData() {
    const dataKey = '@gofinance:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter(
      (expensive: ITransactionData) => expensive.type === 'down'
    )

    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: ITransactionData) => {
        return acumullator + Number(expensive.amount)
      }, 0
    );

    const totalByCategory: ICategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: ITransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if (categorySum > 0) {
        let totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalFormatted = totalFormatted.replace('R$', 'R$ ');

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
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

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >

        <MonthSelect>
          <MonthSelectButton>
            <SelectIcon />
          </MonthSelectButton>

          <Month></Month>

          <MonthSelectButton>
            <SelectIcon />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={50}
            x="percent"
            y="total"
          />
        </ChartContainer>

        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  )
}