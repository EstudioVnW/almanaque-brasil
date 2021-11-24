// Libs
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

// Assets
import leaf from '../../images/whatIsWhatIs/pale_leaves.svg';
import flags from '../../images/icons/flags.svg';
import starrySky from '../../images/icons/starrySky.svg';

// Components
import Modal from '../modal/modal';
import Button from '../buttons/button';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background-color: #F3F3F3; 
  width: 100%;
  height: 100vh;
  justify-content: center;
  z-index: 4;
`;

const RandomBox = styled.div`
  position: relative;
  width: 100%;
  height: 82%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  background: #F3F3F3;
`;

const ContentDialogBox = styled.div`
  position: relative;
  top: 2rem;
  display: flex;
  justify-content: center;
    
  @media(max-width: 375px) {
    width: 100vw;
  }
`;

const DialogBox = styled.div`
  position: absolute;
  top: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 95%;
  min-height: 261px;
  max-height: 285px;
  border-radius: 25px;
  text-align: center;
  background-image: url("${props => props.backgroundImg}");
  background-position: ${props => props.backgroundPosition};
  background-size:  ${props => props.backgroundSize};
  background-repeat: no-repeat;
  z-index: 1;
  overflow-y: auto; 

  ::-webkit-scrollbar {
		width: 4px;
		height: 10px;
	}
	::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 20px;
	}
	::-webkit-scrollbar-thumb {
    background: transparent;
		border-radius: 13px;
	}
	::-webkit-scrollbar-thumb:hover {
    background: transparent;
	}
  
  h1 {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1.4;
    color: #FB6C76;

    @media(max-width: 320px) {
      font-size: 1.4rem;
    }
  }

  p {
    font-size: 1rem;
    margin: .6rem 0;
    color: #161616;
  }
`;

const MsgError = styled.p`
  margin: auto;
  text-align: center;
  letter-spacing: 0;
`;

const ErrorTip = styled.p`
  padding-top: 1rem;
  text-align: center;
  font-weight: 900;
  color: #161616;
  letter-spacing: 0;
`;

const ButtonsBox = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 4vh;
  background-color: #FFFFFF;
  width: 100%;
  max-width: 440px;
  z-index: 5;

  @media(max-width: 425px) {
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

function WrongAnswer({ chances, handleClick, handleShowAnswer, errorMessages }) {
  const history = useHistory();
  const [hasChances, setHasChance] = useState(true);
  const [isFirstMistake, setIsFirstMistake] = useState(true);
  console.log(hasChances)

  useEffect(() => {
    if (chances < 2) setIsFirstMistake(false)
    if (chances <= 0) setHasChance(false)
  }, [chances]);

  const handleActivity = () => {
    history.goBack();
  };

  const errorMessage = [
    'Opa, você errou!',
    <span>Vamos tentar novamente?</span>
  ];

  const noChances = [
    'Esta foi a sua',
    <span> última chance!</span>
  ];

  const renderText = (firstMistake) => {
    if (firstMistake) {
      switch (!!errorMessages?.length) {
        case true:
          return (
            <>
              <MsgError>
                Você tem mais {chances} chances de marcar
                <span> pontos. Se liga na dica:</span>
              </MsgError>
              <ErrorTip>{errorMessages[0]}</ErrorTip>
            </>
          );

        default:
          return <MsgError>
            Você tem mais {chances} chances de marcar
            <span> pontos.</span>
          </MsgError>
      }
    } else {
      if (hasChances) {
        switch (!!errorMessages?.length) {
          case true:
            return (
              <>
                <MsgError>
                  Você tem mais 1 chance de marcar
                  <span> pontos. Se liga em outra dica:</span>
                </MsgError>
                <ErrorTip>{errorMessages[1]}</ErrorTip>
              </>
            );

          default:
            return <MsgError>
                Você tem mais 1 chance de marcar
                <span> pontos.</span>
              </MsgError>
        }
      } else {
        return <MsgError>Gostaria de saber a resposta?</MsgError>
      }
    }
  };

  const setFigure = () => {
    if (chances === 1) return `url(${flags})`
    else if (chances === 2) return `-360px -350px / 35rem url(${leaf})`
    else return `8rem -6.5rem / 17rem url(${starrySky})`
  };

  const renderDialogBox = () => (
    <>
      <ContentDialogBox>
        <Modal
          background='transparent'
          backgroundImg={setFigure()}
          subtitle={chances !== 0 ? errorMessage : noChances}
          data={renderText(isFirstMistake, errorMessages)}
          bottom='3.5rem'
          padding='2rem 7px 1rem'
          width
          font='1.4em'
          color='#fb6c76'
          elifas='tip'
          elifasPos='7.5rem'
          elifasWidth='9.5rem'
          isWrongAnswer
        />
      </ContentDialogBox>
    </>
  );

  const renderButton = () => (
    <>
      {hasChances ? (
        <Button
          margin={"0 0 20px 0"}
          buttonBg={"#ff3d4a"}
          color={"#FFFFFF"}
          boxShadow={"#e61a28 0px 7px 0px"}
          handleClick={handleClick}
        >Tente Novamente</Button>
      ) : (
        <Button
          handleClick={handleShowAnswer}
          margin={"0 0 20px 0"}
          buttonBg={"#399119"}
          color={"#FFFFFF"}
          boxShadow={"#245812 0px 7px 0px"}
        >Saber a resposta</Button>
      )

      }
      <Button
        margin={"0 0 20px 0"}
        buttonBg={"rgb(252, 208, 41)"}
        boxShadow={"#F08800 0px 7px 0px"}
        handleClick={handleActivity}
      >
        Continuar Trilha
      </Button>
    </>
  );

  return (
    <Container>
      <RandomBox>
        {renderDialogBox()}
      </RandomBox>
      <ButtonsBox>
        {renderButton()}
      </ButtonsBox>
    </Container>
  )
}

export default WrongAnswer;