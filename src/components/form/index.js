import React from 'react';
import styled from 'styled-components';

//Component
import Input from './input';
import Button from '../buttons/button';
import Select from './contentSelect';
import CheckBox from './checkBox';

// Styles
const Container = styled.form`
  margin: auto;
  width: 100%;
  max-width: 425px;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: ${props => props.login ? 'flex-start' : 'center'};
  flex-direction: column;

  @media(min-width: 1024px) {
    padding-top: ${props => props.login && '2rem'};
  }
`;

const Label = styled.label`
  max-width: 300px;
  text-align: center;
  padding: ${props => props.login ? '1rem 0 .5rem' : '2rem 0 .5rem'};
  font-size: 1.5rem;
  font-weight: 900;
  color: #373737;
`;

const Subtitle = styled.p`
  padding-bottom: 2rem;
  font-size: 1rem;
  color: #373737;
  text-align: center;
`;

const Error = styled.p`
  padding-bottom: 1rem;
  padding-left: 1rem;
  font-size: .75rem;
  color: #FF3333;
  align-self: self-end;
`;

const ButtonSpacer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const Form = ({
  label,
  subtitle,
  name,
  value,
  maxLength,
  children,
  placeholder,
  type,
  isError,
  selector,
  handleChange,
  showPassword,
  handleViewPassword,
  handleSubmit,
  isTermsAccepted,
  handleAceptTerms,
  login,
  attention,
  emailValue,
  passValue,
  handleLogin,
  isLoading,
  finished
}) => {

  return login
    ? (
      <Container onSubmit={handleLogin} login>
        <Label login={login}>Email</Label>
        <Input
          name="email"
          value={emailValue}
          placeholder={"Digite seu email aqui"}
          type={'email'}
          handleChange={handleChange}
        />

        <Label login={login}>Senha</Label>
        <Input
          name="password"
          value={passValue}
          placeholder={"Digite sua senha aqui"}
          type={showPassword ? 'text' : 'password'}
          autoFocus={false}
          showPassword={showPassword}
          handleChange={handleChange}
          handleViewPassword={handleViewPassword}
        />
        <Error>{isError}</Error>
        <ButtonSpacer>
          <Button isLoading={isLoading}>Entrar</Button>
        </ButtonSpacer>
      </Container>
    )
    : (
      <Container onSubmit={handleSubmit}>
        <Label>{label}</Label>
        <Subtitle>{subtitle}</Subtitle>
        {selector ? (
          <Select
            value={value}
            name={name}
            handleChange={handleChange}
            isTermsAccepted={isTermsAccepted}
            handleAceptTerms={handleAceptTerms}
            attention={attention}
            isError={isError}
          />
        ) : (
          <>
            <Input
              name={name}
              value={value}
              placeholder={placeholder}
              type={type}
              maxLength={maxLength}
              handleChange={handleChange}
              showPassword={showPassword}
              handleViewPassword={handleViewPassword}
            />
            <Error>{isError}</Error>
          </>
        )}
        {finished && (
          <CheckBox
            isSelected={isTermsAccepted}
            onClick={handleAceptTerms}
            attention={attention}
          />
        )}
        <Button margin='0'>{children ? children : 'Próximo'}</Button>
      </Container>
    );
}

export default Form;