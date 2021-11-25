import React, { useState } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

//Components
import Form from '../../../components/form'
import Header from '../../../components/header';
import Loader from '../../../components/loader';

//Redux
import { signIn } from '../../../dataflow/modules/signIn-modules';
import { getActionsBook } from '../../../dataflow/thunks/actionsBook-thunks';

//Styles
const Container = styled.div`
  padding: 1.25rem 1rem 1rem;
  min-height: 100vh;
  background: #F3F3F3;
`;

const ResetButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
  text-align: center;
  font-size: .75rem;
	padding: 1rem;
  color: #373737;
  font-weight: 900;
  cursor: pointer;
`;

const ButtonSpacer = styled.div`
  width: 100%;
	display: flex;
	justify-content: center;
`;

const mapDispatchToProps = dispatch => {
  return {
    signIn: (info) => dispatch(signIn(info)),
    getActionsBook: () => dispatch(getActionsBook())
  }
};

const Login = (props) => {
  const [register, setRegister] = useState(
    {
      email: '',
      password: ''
    }
  )
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    let timer;  
    timer = setTimeout(() => props.history.push('/dashboard'), 2000);

    return () => {
      clearTimeout(timer);
    };
  }

  const handleViewPassword = (ev) => {
    ev.stopPropagation();
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    handleSignIn()
  }

  async function handleSignIn() {
    try {
      const user = await Auth.signIn(register.email, register.password);
      const token = user.signInUserSession.idToken.jwtToken;
      props.signIn(user.attributes)
      localStorage.setItem('idToken', token)
      props.getActionsBook()
      setIsLoading(true)
      handleLoading()
      props.history.push('/dashboard')
    } catch (error) {
      console.log('error', error);
      if (error.code === "NotAuthorizedException") setError("O e-mail ou senha inseridos estão incorretos.");
      if (error.code === "UserNotConfirmedException") {
        props.history.push({
          pathname: `/conta-criada`,
          state: { email: register.email }
        });
      };
      if (error.code === "UserNotFoundException") {
        props.history.push({
          pathname: `/cadastro`,
          state: { email: register.email }
        });
      };
    }
  }

  const resetPassword = () => {
    props.history.push('/redefinir-senha');
  }

  const goBack = () => {
    props.history.push('/');
  }

  const renderScreen = () => {
    return <Container>
      <Header
        title="Login"
        noPadding
        goBack={goBack}
      />
      <Form
        login
        handleLogin={handleLogin}
        handleChange={handleChange}
        emailValue={register.email}
        passValue={register.password}
        showPassword={showPassword}
        handleViewPassword={handleViewPassword}
        isError={error}
        pass
        isLoading={isLoading}
      />
      <ButtonSpacer>
        <ResetButton onClick={resetPassword}>Esqueceu a senha?</ResetButton>
      </ButtonSpacer>
    </Container>
  }

  return (
    <> 
      {renderScreen()}
    </>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Login);