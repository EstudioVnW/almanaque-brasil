import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { Auth } from 'aws-amplify';

//Components
import Header from '../../../components/header';
import Button from '../../../components/buttons/button';
import Modal from "../../../components/modal/modal.js";

// Styles
const Container = styled.div`
  padding: .9rem;
  width: 100%;
  height: 100vh;
  background: #F3F3F3;
`;

const Content = styled.div`
  height: calc(100% - 30px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  padding: 2rem 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 900;
  color: #373737;
  text-align: center;
`;

const Error = styled.p`
  font-size: .85rem;
  color: #FF3333;
`;

const Tutorial = styled.ol`
  margin-bottom: 1rem;
  list-style: none;
  counter-reset: count;

  ::-webkit-scrollbar {
		width: 4px;
		height: 10px;
	}
	::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 20px;
	}
	::-webkit-scrollbar-thumb {
		background: #ccc;
		border-radius: 13px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #ccc;
	}
`;

const Step = styled.li`
  margin-bottom: 1.1rem;
  line-height: 1.4;
  counter-increment: count;

  &:before {
    content: counter(count) "- ";
    font-size: 1.1em;
    font-weight: 900;
    color: #373737;
  }

  @media (max-width: 320px) { padding: ${props => props.padding && '1.5rem 0 .4rem 0 '}; }
`;

const Text = styled.p`
  span {
    font-size: 1em;
    font-weight: 900;
    color: #373737;
  }
`;

const AccountCreated = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [isResend, setIsResend] = useState(false);

  useEffect(() => {
    setEmail(history?.location?.state?.email);
  }, [history?.location?.state?.email]);

  const goHome = () => {
    history.push("/login");
  }

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(email);
      setIsResend(true);
    } catch (err) {
      if(err.message === "Username/client id combination not found") {
        setIsError({isError: true, msg: 'Combinação de nome de usuário do cliente não encontrada.'});
      } else if (err.message === "User is already confirmed.") {
        setIsError({isError: true, msg: 'O usuário já está confirmado'});
      } else {
        setIsError({isError: true, msg: err.message});
      }
    };

    isError.isError === false && 
    setIsResend(isResend ? false : true);
  };

  const handleResendModal = () => {
    setIsResend(false);
  };

  const content = {
    title: 'Seu e-mail de confirmação foi reenviado!',
    text: ['No caso de não ter recebido o e-mail, verifique a caixa de spam.']
  };

  return (
    <Container>
      <Header noBack title='Confirmar criação da conta' />
      {isResend && 
          <Modal
            subtitle={content.title}
            data={content.text}
            handleClick={handleResendModal}
            background='#70707075'
            font='1.315em'
            isResend={isResend}
          />
      }
      <Content>
        <Title>Quase finalizado!</Title>
        <Tutorial>
          <Step>Você receberá um e-mail, clique em: confirmar e-mail.</Step>
          <Step>Depois de confirmar, retorne ao aplicativo.</Step>
          <Step>Clique em: continuar para o login.</Step>
          <Text>
            <span>Obs: </span>
            Verifique sua caixa de spam e no caso de não ter recebido o e-mail, clique em: reenviar.
          </Text>
        </Tutorial>
        
        <Button margin='1rem' buttonBg='#ffd000' boxShadow='0 6.5px 0 #f08800' handleClick={goHome}>continuar para o login</Button>
        <Button margin='0' buttonBg='transparent' boxShadow='nobe' handleClick={resendConfirmationCode}>reenviar</Button>
        {isError && <Error>{isError.msg ? isError.msg : 'Erro ao reenviar'}</Error>}
      </Content>
    </Container>
  );
}

export default AccountCreated;
