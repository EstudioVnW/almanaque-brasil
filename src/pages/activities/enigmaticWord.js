import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Component
import Header from '../../components/header';
import WrongAnswer from '../../components/activities/wrongAnswer';
import WrongAnswerWithoutScore from '../../components/activities/wrongAnswerWithoutScore';
import CorrectAnswer from '../../components/activities/correctAnswer';
import SplashScreen from './splashScreen';
import Button from '../../components/buttons/containerButton';
import Tutorial from '../../components/modal/tutorialModal';

//Utils
import { allowScore } from '../../utils/activity';
import { chancesAtActivity } from '../../utils/statistics';

//Images
import logo from '../../images/logo/enigmaticWord.svg';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background-color: #F3F3F3;
`;

const Content = styled.div`
  margin-bottom: 1rem; 
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-sizing: border-box;
  background: #f3f3f3;
`

const Puzzle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
`;

const Enigma = styled.div`
  width: 30%;
`;

const EnigmaBox = styled.div`
  display: ${props => props.firstBox && "flex"};
  flex-direction: column;
  align-items: center;
  min-height: ${props => props.firstBox && '245px'};
  /* padding: ${props => props.secondBox ? '.6875rem' : '1.5rem 0.5rem 2rem'}; */
  padding: 1.5rem 0.5rem 2rem;
  margin-top: ${props => props.secondBox && '10px'};
  border-radius: 8px;
  background-color: #FFD000;

  input {
    background-color: #F08800;
    border: none;
    border-radius: 8px;
    padding-bottom: 5px;
    width: 100%;
    height: 35px;
    font-size: 1.5rem;
    font-weight: 900;
    text-align: center;
    color: #373737;
  }

  input::placeholder {
    font-size: .75rem;
    font-weight: 900;
    color: #9b6319;
  }
`;

const EnigmaImage = styled.div`
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat; 
  width: 100%;
  height: 14vh;
  min-height: 90px;
`;

const Less = styled.div`
  margin: 1rem 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  color: #fff;
  width: 2.8rem;
  height: 2.5rem;
  font-size: 1.5rem;
  font-weight: 900;
  background-color: #FF9292;
`;

const Word = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0% 10% 0% 10%;
  min-width: 2.5rem;
  border-radius: 15px;
  color: #373737;
  font-size: 2rem;
  font-weight: 900;
  background-color: #F08800;
`;

function EnigmaticWord({ activitie, registerAction, actionsBook }) {
  const [isLoading, setIsLoading] = useState(true)
  const [enigmas, setEnigmas] = useState(undefined)
  const [modalWrongAnswer, setModalWrongAnswer] = useState(undefined);
  const [isModalWithoutScore, setIsModalWithoutScore] = useState(undefined);
  const [chances, setChances] = useState(null);
  const [modalCorrectAnswer, setModalCorrectAnswer] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false);
  const [isError, setIsError] = useState(undefined);
  const [isTutorial, setIsTutorial] = useState(undefined);
  const [score, setScore] = useState(undefined)

  useEffect(() => {
    setEnigmas(Object.values(activitie.enigmas).map(item => {
      return {
        ...item,
        userInput: ""
      }
    }))

    if (activitie.trailId === 0) {
      setIsTutorial(true);
    }

  }, [activitie]);

  useEffect(() => {
    if (activitie.trailId === 0) {
      setIsTutorial(true);
    }
  }, [activitie]);

  useEffect(() => {
    if (modalWrongAnswer) {
      registerAction({
        activityId: activitie.id,
        trailId: activitie.trailId,
        success: false,
        timestamp: Date.now(),
        score: 0,
        books: false,
      })
    }

    if (modalCorrectAnswer) {
      const point = chances === 3 ? 10 : chances === 2 ? 8 : chances === 1 ? 5 : 0;
      setScore(point)
      registerAction({
        activityId: activitie.id,
        trailId: activitie.trailId,
        success: true,
        timestamp: Date.now(),
        score: point,
        books: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalCorrectAnswer, modalWrongAnswer]);

  useEffect(() => {
    const { synced, pendingSync } = actionsBook;
    const useChancesAtActivity = chancesAtActivity(activitie.id, [...synced, ...pendingSync]);
    setChances(useChancesAtActivity);
  }, [actionsBook, activitie.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!!activitie) setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [activitie]);

  const handleValue = (e, i) => {
    const newEnigmas = enigmas
    enigmas[i].userInput = e.target.value;
    setEnigmas([...newEnigmas]);
    setIsError(false);
  };

  const handleModalWrongAnswer = () => {
    setModalWrongAnswer(!modalWrongAnswer);
  };

  const handleWrongAnswer = () => {
    handleModalWrongAnswer();
    setChances(chances - 1)
  };

  const handleCloseTutorial = () => {
    setIsTutorial(false);
  }

  const showModalAnswer = () => {
    handleModalWrongAnswer();
    setShowAnswer(true);
  };

  const handleWithoutScore = () => {
    setIsModalWithoutScore(undefined);
  }

  const handleSubmit = () => {
    const isError = enigmas.map(item => item.userInput).filter(i => !i).length > 0;
    const listActionsBook = [...actionsBook.synced, ...actionsBook.pendingSync];
    const useAllowScore = allowScore(activitie.trailId, activitie.id, listActionsBook);
    const useCorrectAnswer = activitie.answer.answer.toLowerCase();
    let userAnswer = "";
    // eslint-disable-next-line array-callback-return
    enigmas.map(item => {
      userAnswer = `${userAnswer}${item.userInput}`
    })
    userAnswer = userAnswer.toLowerCase();

    if (isError) {
      setIsError(true);
    } 
    if(useAllowScore) {
      const listActionsBook = [...actionsBook.synced, ...actionsBook.pendingSync];
      const useAllowScore = allowScore(activitie.trailId, activitie.id, listActionsBook);
      if (useAllowScore) {
        userAnswer = userAnswer.toLowerCase();
        if (userAnswer === useCorrectAnswer) setModalCorrectAnswer(true);
        else handleWrongAnswer()

      }
    } else {
      if (userAnswer === useCorrectAnswer) {
        setIsModalWithoutScore(true);
        showModalAnswer();
      } 
      else setIsModalWithoutScore(false);
    }
  };

  return (
    isLoading ? <SplashScreen activitieLogo={logo} /> : (
      <Container>
        <Header title={activitie?.name} />
        <Content>
          <Puzzle>
            {enigmas && enigmas.map((enigma, i) => {
              return (
                <Enigma key={i}>
                  <EnigmaBox firstBox>
                    <EnigmaImage src={`data:image/jpeg;base64,${enigma.imageBase64}`} />
                    <Less>-</Less>
                    <Word>{enigma.subtrair}</Word>
                  </EnigmaBox>
                  <EnigmaBox secondBox>
                    <input
                      value={enigma.userInput}
                      onChange={(e) => handleValue(e, i)}
                      autoComplete="off"
                      maxLength="4"
                      placeholder="Digite aqui"
                      type="text"
                    ></input>
                  </EnigmaBox>
                </Enigma>
              );
            })}
          </Puzzle>
        </Content>
        <Button
          isError={isError && 'Você precisa digitar em todos os campos'}
          handleClick={handleSubmit}
          buttonBg='#ffd000'
        >responder
        </Button>
        {modalWrongAnswer && isModalWithoutScore === undefined && <WrongAnswer chances={chances} handleClick={handleModalWrongAnswer} handleShowAnswer={showModalAnswer} />}
        {isModalWithoutScore === false && <WrongAnswerWithoutScore handleClick={handleWithoutScore} handleShowAnswer={showModalAnswer} />}
        {modalCorrectAnswer && <CorrectAnswer answer={activitie.answer} toScore score={score} idActivitie={activitie.id} />}
        {showAnswer && <CorrectAnswer answer={activitie.answer} score={score} noScore={isModalWithoutScore === true} idActivitie={activitie.id} />}
        {isTutorial && <Tutorial screen={activitie?.name} btnContent='Jogar' handleCloseTutorial={handleCloseTutorial} />}
      </Container>
    )
  )
}

export default EnigmaticWord;
