import React, { useCallback, useRef } from 'react';
import { Image, TextInput, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png'

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
} from './styles';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidatioErrors';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      // await api.post('/users', data);

      // history.push('/signin');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro no cadastro, tente novamente',
      )
    }
  }, []);

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
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                returnKeyType="next"
                name="name"
                icon="user"
                placeholder="Nome"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}></Input>
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                name="email"
                icon="mail"
                placeholder="Email"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}></Input>
              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                name="password"
                icon="lock"
                placeholder="Senha"></Input>

            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>


          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff"></Icon>
        <BackToSignInText>
          Voltar para logon
        </BackToSignInText>
      </BackToSignIn>

    </>
  )
}

export default SignUp;
