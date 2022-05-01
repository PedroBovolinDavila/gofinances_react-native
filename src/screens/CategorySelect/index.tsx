import React from 'react'
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';

import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles'

interface ICategory {
  key: string;
  name: string;
}

interface IProps {
  category: string;
  setCategory(category: ICategory): void;
  closeSelectCategory(): void;
}

export function CategorySelect({
  category,
  closeSelectCategory,
  setCategory
}: IProps) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>
              {item.name}
            </Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          activeOpacity={.7}
          title="Selecionar"
        />
      </Footer>
    </Container>
  )
}