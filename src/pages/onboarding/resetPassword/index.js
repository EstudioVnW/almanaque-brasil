import React, { useState } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

//Components
import Header from '../../../components/header/headerOnb';
import Form from '../../../components/form';

//Styles
const Container = styled.div`
  padding: 1rem;
  min-height: 100vh;
  background: #F3F3F3;
`;

const Info = styled.p`
  margin: auto;
  padding: 0.5rem;
  width: fit-content;
  background: #ccc;
  border-radius: 8rem;
`;

const ResetPassword = (props) => {
  const steps = [
    { name: 'email', value: 1 },
    { name: 'code', value: 2 },
    { name: 'password', value: 3 },
  ];
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [register, setRegister] = useState({ email: '', password: '' });
  const [isError, setIsError] = useState({ email: '', password: '' });
  const [isViewPassword, setIsViewPassword] = useState({});
  const [isSuccessNewPassword, setIsSuccessNewPassword] = useState(undefined);

  const handleCheckEmail = async (email) => {
    Auth.forgotPassword(email)
      .then(data => console.log('data', data))
      .catch(err => console.log('error', err));
  }

  const handleNewPassword = async (email, code, password) => {
    // setIsSuccessNewPassword();
    Auth.forgotPasswordSubmit(email, code, password)
      .then(data => props.history.push({ pathname: `/` }))
      .catch(err => {
        if(err.code === "CodeMismatchException") {
          setCurrentStep({name: 'code', value: 2});
          setIsError({
            code: true,
            msg: 'Código de verificação inválido, tente novamente.'
          });
        }
        console.log('err po', err);
      });
  }
  

  const handleGoBack = () => {
    props.history.goBack()
  }

  const handleIsError = (name) => {
    setIsError({
      [name]: false,
    });
  }

  const handleChange = (ev) => {
    ev.preventDefault();
    const value = ev.target.value;
    const name = ev.target.name;

    setRegister({
      ...register,
      [name]: value,
    });

    handleIsError(currentStep.name);
  }

  const handleChangeSelect = (ev) => {
    const target = ev?.target;

    setRegister({
      ...register,
      [target.name]: target.value,
    });

    handleIsError(currentStep.name);
  }

  const handleViewPassword = (ev) => {
    ev.preventDefault();

    setIsViewPassword(!isViewPassword);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { email, code, password } = register;
    const pageName = currentStep.name;

    const isEmailValid = !!email;
    const isPageEmailValid = pageName === 'email' && isEmailValid;

    const isCodeValid = !!code;
    const isPageCodeValid = pageName === 'code' && isCodeValid;

    const isPasswordValid = !!password && password.length >= 6;
    const isPagePasswordValid = pageName === 'password' && isPasswordValid;

    const isPageValid = isPageEmailValid || isPageCodeValid || isPagePasswordValid;

    if (isPageValid) {
      if (pageName === 'email') {
        handleCheckEmail(email);
        return setCurrentStep(steps[currentStep.value]);
      }
      if (pageName === 'code') {
        return setCurrentStep(steps[currentStep.value]);
      }
      if (pageName === 'password') {
        handleNewPassword(email, code, password);
      }
    } else {
      setIsError({
        [pageName]: true,
        msg: isError,
      });
    }
  }

  const RenderValidateEmail = () => {
    return (
      <Form
        label='Vamos te ajudar a redefinir sua senha'
        subtitle='Digite um e-mail abaixo para redefinir sua senha.'
        name='email'
        value={register?.email}
        type='email'
        placeholder='Digite o e-mail de redefinição aqui'
        handleChange={handleChangeSelect}
        children='enviar email de redefinição'
        handleSubmit={handleSubmit}
      />
    );
  }

  const RenderValidateCode = () => {
    return (
      <Form
        label='Verifique seu e-mail'
        subtitle='Enviamos um código de confirmação para o seu e-mail digitado.'
        name='code'
        value={register?.code}
        type='number'
        placeholder='Digite o código de redefinição aqui'
        isError={isError?.code && isError?.msg}
        handleChange={handleChangeSelect}
        handleSubmit={handleSubmit}
      />
    );
  }

  const RenderNewPassword = () => {
    return (
      <Form
        label='Nova senha'
        subtitle='Digite abaixo sua nova senha'
        name='password'
        type={isViewPassword ? 'password' : 'text'}
        value={register?.password}
        placeholder='Digite sua nova senha aqui'
        isError={isError?.password && 'Sua senha deve conter 6 caracteres'}
        handleChange={handleChange}
        isViewPassword={isViewPassword}
        handleViewPassword={handleViewPassword}
        handleSubmit={handleSubmit}
      />
    );
  }

  const renderByStep = () => {
    switch (currentStep.name) {
      case steps[0].name: return <RenderValidateEmail />
      case steps[1].name: return <RenderValidateCode />
      case steps[2].name: return <RenderNewPassword />
      default: return <RenderValidateEmail />
    }
  }

  return (
    <Container>
      <Header text='Redefinir senha' onClick={handleGoBack} />
      {renderByStep()}
      {isSuccessNewPassword && <Info>Senha redefinida com sucesso!</Info>}
    </Container>
  );
}

export default ResetPassword;