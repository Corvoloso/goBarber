import React, { useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  ButtonsContainer,
  BackButton,
  LogOutButton,
  Title,
  UserAvatarButton,
  UserAvatar,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const { goBack } = useNavigation();

  const handleUpdateProfileData = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email valido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().min(6, 'Você deve informar uma nova senha'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().min(6, 'As senhas devem ser iguais'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Senhas devem ser iguais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso');

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        Alert.alert('Erro na atualização do perfil', 'Tente novamente');
      }
    },
    [goBack, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      async response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        const api_response = await api.patch('/users/avatar', data);

        updateUser(api_response.data);
      },
    );
  }, [user.id, updateUser]);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <ButtonsContainer>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <LogOutButton onPress={signOut}>
              <Icon name="power" size={24} color="#999591" />
            </LogOutButton>
          </ButtonsContainer>

          <UserAvatarButton onPress={handleUpdateAvatar}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </UserAvatarButton>

          <Title>Meu Perfil</Title>

          <Form
            initialData={{ name: user.name, email: user.email }}
            style={{ width: '100%' }}
            ref={formRef}
            onSubmit={handleUpdateProfileData}
          >
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              ref={emailInputRef}
              name="email"
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
            />

            <Input
              ref={oldPasswordInputRef}
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="next"
              secureTextEntry
              textContentType="newPassword"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              containerStyle={{ marginTop: 16 }}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="next"
              secureTextEntry
              textContentType="newPassword"
              onSubmitEditing={() =>
                passwordConfirmationInputRef.current?.focus()
              }
            />

            <Input
              ref={passwordConfirmationInputRef}
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              returnKeyType="send"
              secureTextEntry
              textContentType="newPassword"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Confirmar Mudanças
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
