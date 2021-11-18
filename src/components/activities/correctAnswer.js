import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

//Components
import ScoreScreen from '../activities/scoreScreen';
import Button from '../buttons/button';
import TrunkInfoScreen from '../thunk/trunkInfoScreen';
import NoScore from '../activities/noScore';

//Redux
const mapStateToProps = state => ({
  thunk: state.thunk.data,
});

//Styles
const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #f3f3f3;
  z-index: 4;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 1.5rem 1rem .5rem;
  background-color: #FFFFFF;
  width: 100%;
  max-width: 425px;
  height: ${props => props.height || "90vh"};
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${props => props.backgroundColor || '#FFFFFF'};
  width: 100%;
  max-width: 425px;
`;

const Img = styled.img`
  width: 100%;
  height: 45vh;
  max-width: 425px;
  object-fit: cover;

  @media (max-width: 425px) { width: 100%; }
`;

const ComplementaryInformationBox = styled.div`
  padding: 0 .5rem 1rem;
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #373737;
`;

const Scroll = styled.div`
  overflow-y: scroll;
  height: 100%;

  ::-webkit-scrollbar {
    width: 4px;
    height: 10px;
    background: transparent;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 13px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;

const Title = styled.h1`
  font-size: .9375rem;
  font-weight: 300;
  color: #373737;
  
  @media(min-width: 1024px) {font-size: 1rem;}
`;

const TextName = styled.h1`
  font-size: 1.625rem;
  color: #0D0D0D;
  font-weight: 900;
  text-transform: capitalize;
`;

const Text = styled.p`
  margin-top: 1rem;
  width: 100%;
  max-width: 412px;
  font-size: .9em;
  color: #000000;
  text-align: left;

  @media (min-width: 1024px) { font-size: 1rem; }
`;

const CorrectAnswer = (props) => {
  const history = useHistory();
  const [actualModal, setActualModal] = useState(undefined);

  const [isModalThunk, setIsModalThunk] = useState({ isModal: undefined, data: undefined });

  const modals = {
    toScore: "toScore",
    answerDescription: "answerDescription",
    noScore: "noScore"
  }

  useEffect(() => {
    props.toScore
      ? setActualModal(modals.toScore)
      : props.noScore
        ? setActualModal(modals.noScore)
        : setActualModal(modals.answerDescription)

  }, [props.toScore, modals.answerDescription, props.idActivitie, props.noScore, modals.toScore, modals.noScore]);

  const handleContinue = () => {
    switch (actualModal) {
      case modals.toScore:
        return setActualModal(modals.answerDescription);

      case modals.noScore:
        return setActualModal(modals.answerDescription);

      default:
        break;
    }
  }

  const handleModalThunk = () => {
    const { thunk, idActivitie } = props;
    const data = thunk.filter(item => item.id === idActivitie)[0];

    setIsModalThunk({ isModal: !isModalThunk.isModal, data: data });
  }

  const renderModal = () => {
    const { answer, isTrunk, idActivitie } = props;
    switch (actualModal) {
      case modals.toScore:
        return (
          <ScoreScreen
            score={props.score}
            handleClick={() => handleContinue()}
          />
        );
      case modals.answerDescription:
        return (
          <MessageBox height={'58vh'}>
            <ComplementaryInformationBox>
              <Title>A resposta é:</Title>
              <TextName>{answer.answer}</TextName>
              <Scroll>
                <Text>{answer.complementaryInformation}</Text>
              </Scroll>
            </ComplementaryInformationBox>
            <ButtonBox>
              {isTrunk && idActivitie && (
                <Button
                  color={"#373737"}
                  margin={"0 0 20px 0"}
                  buttonBg={"#FFD000"}
                  boxShadow={"#F08800 0px 7px 0px"}
                  handleClick={handleModalThunk}
                >Veja mais no nosso Baú</Button>
              )}
              <Button
                color={"#fff"}
                margin={"0 0 20px 0"}
                buttonBg={"#399119"}
                boxShadow={"#245812 0px 7px 0px"}
                handleClick={() => history.goBack()}
              >Continuar trilha</Button>
            </ButtonBox>
          </MessageBox>
        );
      case modals.noScore:
        return (
          <NoScore
            handleClick={handleContinue}
          />
        );

      default:
        return <h1>Carregando</h1>
    }
  }

  return (
    <Container>
      {(props.answer?.imageBase64) && <Img src={`data:image/jpeg;base64,${props.answer.imageBase64}`}></Img>}
      {renderModal()}
      {isModalThunk?.isModal && <TrunkInfoScreen itemData={isModalThunk?.data} onClick={handleModalThunk} />}
    </Container>
  );
}

export default connect(
  mapStateToProps,
)(CorrectAnswer);
