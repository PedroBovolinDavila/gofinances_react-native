import React, { useState } from 'react'
import { ActivityIndicator, Alert, Platform } from 'react-native'

import { SignInSocialButton } from '../../components/SignInSocialButton'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './style'

import { useTheme } from 'styled-components'

import { RFValue } from 'react-native-responsive-fontsize'
import { useAuth } from '../../hooks/auth'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth()

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {

      setIsLoading(true)
      return await signInWithGoogle();

    } catch (err) {
      console.log(err)
      Alert.alert('Erro', 'Não foi possivel conectar a conta Google, tente novamente')
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {

      setIsLoading(true)
      return await signInWithApple();

    } catch (err) {
      console.log(err)
      Alert.alert('Erro', 'Não foi possivel conectar a conta Apple, tente novamente')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de uma forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {
            Platform.OS === 'ios' && <SignInSocialButton
              activeOpacity={.9}
              title='Entrar com Apple'
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          }
        </FooterWrapper>

        {
          isLoading && <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        }

      </Footer>
    </Container>
  )
}