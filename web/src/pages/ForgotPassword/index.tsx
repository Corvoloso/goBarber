import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  // const history = useHistory();

  const { addToast } = useToast();

  const handleForgotPassword = useCallback(
    async (formData: ForgotPasswordFormData) => {
      setLoading(true)

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email valido'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: formData.email
        });

        addToast({
          type: 'success',
          title: 'Email de recuperação enviado',
          description: 'Enviamos um email para a recuperação de senha, cheque sua inbox'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: "error",
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um erro ao tentar realizar a recuperação de senha. Tente novamente'
        })

      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleForgotPassword}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">Recuperar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
