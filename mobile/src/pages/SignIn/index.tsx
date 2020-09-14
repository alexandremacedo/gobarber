import React from 'react';
import { Image } from 'react-native'
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png'

import { Container, Title } from './styles';
const SignIn: React.FC = () => {
  return (<Container>
    <Image source={logo}></Image>
    <Title>Faça seu logon</Title>

    <Input name="email" icon="mail" placeholder="Email"></Input>
    <Input name="password" icon="lock" placeholder="Senha"></Input>

    <Button onPress={() => { }}>Entrar</Button>

  </Container>)
}

export default SignIn;
