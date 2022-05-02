import React, { useState } from "react";
import { Keyboard, Modal, Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import uuid from 'react-native-uuid'


import { InputForm } from "../../components/Forms/InputForm";
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

interface INavigationProps {
  navigate: (screen: string) => void;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Informe um nome'),
  amount: Yup
    .number()
    .required('Informe um preço')
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
})

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const dataKey = '@gofinance:transactions'

  const navigation = useNavigation<INavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: Partial<IFormData>) {
    if (!transactionType) {
      return Alert.alert('Erro', "Selecione o tipo da transação")
    }

    if (category.key === 'category') {
      return Alert.alert('Erro', "Selecione a categoria da transação")
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)

      const currentData = data ? JSON.parse(data) : []

      const dataFormated = [
        newTransaction,
        ...currentData
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      })

      navigation.navigate("Listagem");

    } catch (err) {
      console.log(err)
      Alert.alert("Erro", "Não foi possivel salvar sua transação")
    }
  }

  return (
    <TouchableWithoutFeedback
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              error={errors.name && errors.name.message}
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
            />
            <InputForm
              name="amount"
              error={errors.amount && errors.amount.message}
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
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
    </TouchableWithoutFeedback>
  )
}