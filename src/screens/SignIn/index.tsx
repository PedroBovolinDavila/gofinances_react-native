import React from 'react'
import { Alert } from 'react-native'

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

import { RFValue } from 'react-native-responsive-fontsize'
import { useAuth } from '../../hooks/auth'

export function SignIn() {
  const { signInWithGoogle } = useAuth()

  async function handleSignInWithGoogle() {
    try {

      await signInWithGoogle();

    } catch (err) {
      console.log(err)
      Alert.alert('Erro', 'Não foi possivel conectar a conta Google, tente novamente')
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
          <SignInSocialButton
            activeOpacity={.9}
            title='Entrar com Apple'
            svg={AppleSvg}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}