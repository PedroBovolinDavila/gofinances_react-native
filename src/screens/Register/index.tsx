import React, { useState } from "react";

import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../../components/Forms/CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />

          <Input
            placeholder="Preço"
          />

          <TransactionsTypes>
            <TransactionTypeButton
              activeOpacity={.5}
              type="up"
              title="Entrada"
              onPress={() => handleTransactionTypeSelect('up')}
              active={transactionType === 'up'}
            />

            <TransactionTypeButton
              activeOpacity={.5}
              type="down"
              title="Saida"
              onPress={() => handleTransactionTypeSelect('down')}
              active={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelect
            title="Categoria"
          />
        </Fields>

        <Button title="Enviar" activeOpacity={.7} />
      </Form>
    </Container>
  )
}