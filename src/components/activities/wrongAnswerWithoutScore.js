// Libs
import React from 'react';
import styled from 'styled-components';

// Assets
import iconElifas from '../../images/elifas/tip.svg';
import leaf from '../../images/whatIsWhatIs/pale_leaves.svg';
import dialogBox from '../../images/dialogBox/dialogBoxMedium.svg';

// Components
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
`

const RandomBox = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  bottom: 25vh;
  background: #F3F3F3;

  @media(min-width: 1024px) {bottom: 12vh}
`;

const ContentDialogBox = styled.div`
  position: relative;
  top: 6rem;
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
  background-repeat: no-repeat;
  background-position: ${props => props.backgroundPosition};
  background-size:  ${props => props.backgroundSize};
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
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 2.3rem;
    color: #FB6C76;

    @media(max-width: 320px) {
      font-size: 1.4rem;
    }
  }
  p {
    font-size: 1rem;
    margin: 1rem 0 1rem 0;
    color: #161616;
  }
`;

const ImgDialogBox = styled.img`
  width: 100%;
`;

const MsgError = styled.div`
  margin: auto;
`;

const Avatar = styled.img`
  position: relative;
  right: -120px;
  bottom: -2rem;
  width: 9rem;
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

  @media(max-width: 425px) {
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

function WrongAnswerWithoutScore({ handleClick, handleShowAnswer }) {
  const renderMsgError = () => (
    <MsgError>
      <h1>Opa, você errou!</h1>
      <h1>Vamos tentar novamente?</h1>
    </MsgError>
  );

  const setBackgroundImg = () => {
    return { img: leaf, position: "-305px -296px", size: "500px" }
  }

  const renderDialogBox = () => (
    <>
      <ContentDialogBox>
        <DialogBox
          backgroundImg={setBackgroundImg().img}
          backgroundPosition={setBackgroundImg().position}
          backgroundSize={setBackgroundImg().size}
        >
          {/* {renderText(isFirstMistake, errorMessages)} */}
         {renderMsgError()}
        </DialogBox>
        <ImgDialogBox src={dialogBox} alt='DialogBox' />
      </ContentDialogBox>
      <Avatar src={iconElifas} />
    </>
  );

  const renderButton = () => (
    <>
      <Button
        margin={"0 0 20px 0"}
        buttonBg={"#ff3d4a"}
        color={"#FFFFFF"}
        boxShadow={"#e61a28 0px 7px 0px"}
        handleClick={handleClick}
      >Tente Novamente</Button>
      <Button
        handleClick={handleShowAnswer}
        margin={"0 0 20px 0"}
        buttonBg={"#399119"}
        color={"#FFFFFF"}
        boxShadow={"#245812 0px 7px 0px"}
      >Saber a resposta</Button>
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

export default WrongAnswerWithoutScore;
