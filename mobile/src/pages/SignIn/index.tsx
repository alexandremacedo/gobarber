import React, { useCallback, useRef } from 'react';
import { Image, TextInput, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png'

import { Form } from '@unform/mobile'

import * as Yup from 'yup'

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidatioErrors';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()
  const { signIn, user } = useAuth()

  console.log(user)

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        // history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque suas credenciais')

      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logo}></Image>

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn} >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => {

                }} />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }} />
            </Form>

            <Button onPress={() => {
              formRef.current?.submitForm()
            }}>Entrar</Button>

            <ForgotPassword onPress={() => { }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000"></Icon>
        <CreateAccountButtonText>
          Criar uma conta
        </CreateAccountButtonText>
      </CreateAccountButton>

    </>
  )
}

export default SignIn;
