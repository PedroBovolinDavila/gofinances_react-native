import React from "react";
import { TouchableHighlightProps } from "react-native";

import {
  Container,
  Icon,
  Title,
} from './styles'

interface IProps extends TouchableHighlightProps {
  title: string;
  type: 'up' | 'down';
  active: boolean
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export function TransactionTypeButton({ title, type, active, ...rest }: IProps) {
  return (
    <Container
      active={active}
      type={type}
      {...rest}
    >
      <Icon
        name={icons[type]}
        type={type}
      />
      <Title>{title}</Title>
    </Container>
  )
}