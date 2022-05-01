import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import { Modal } from 'react-native'

import { InputForm } from "../../components/Forms/InputForm";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

interface IFormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
  } = useForm()

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: Partial<IFormData>) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
          />

          <InputForm
            name="amount"
            control={control}
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

          <CategorySelectButton
            onPress={handleOpenSelectCategoryModal}
            title={category.name}
          />
        </Fields>

        <Button
          title="Enviar"
          activeOpacity={.7}
          onPress={handleSubmit(handleRegister)}
        />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>

    </Container>
  )
}