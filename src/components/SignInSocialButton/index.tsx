import React from 'react'
import { SvgProps } from 'react-native-svg';
import { TouchableOpacityProps } from 'react-native'

import {
  Button,
  ImageContainer,
  Text,
} from './styles'

interface IProps extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({ title, svg: Svg, ...rest }: IProps) {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Text>
        {title}
      </Text>
    </Button>
  )
}