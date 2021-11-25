/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//Components
import Header from '../../components/header';
import Button from '../../components/buttons/containerButton';
import CorrectAnswer from '../../components/activities/correctAnswer';
import SplashScreen from './splashScreen';
import WrongAnswer from '../../components/activities/wrongAnswer';
import WrongAnswerWithoutScore from '../../components/activities/wrongAnswerWithoutScore';
import ContentImageText from '../../components/activities/activitieDescription';
import OptionsButtons from '../../components/activities/optionsButtons';
import Tutorial from '../../components/modal/tutorialModal';

//Utils
import { allowScore } from '../../utils/activity';
import { chancesAtActivity } from '../../utils/statistics';

//Images
import logo from '../../images/logo/didYouKnow.svg';

// Styles
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #f3f3f3;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`;

const DidYouKnow = (props) => {
  const [isModalAnswerOption, setIsModalAnswerOption] = useState(undefined);
  const [modalCorrectAnswer, setModalCorrectAnswer] = useState(false)
  const [answer, setAnswer] = useState(undefined);
  const [modalWrongAnswer, setModalWrongAnswer] = useState(undefined);
  const [isModalWithoutScore, setIsModalWithoutScore] = useState(undefined);
  const [activitie, setActivitie] = useState(undefined);
  const [showAnswer, setShowAnswer] = useState({ isModal: undefined, answer: undefined });
  const [isLoading, setIsLoading] = useState(true);
  const [chances, setChances] = useState(null);
  const [isTutorial, setIsTutorial] = useState(undefined);
  const [score, setScore] = useState(undefined)

  useEffect(() => {
    let timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const { useActivitie } = props;
    setActivitie(useActivitie);
  }, [props, props.useActivitie]);

  useEffect(() => {
    const { useActivitie } = props;
    if (useActivitie.trailId === 0) {
      setIsTutorial(true);
    }
  }, []);

  useEffect(() => {
    if (modalWrongAnswer) {
      props.registerAction({
        activityId: props.useActivitie.id,
        trailId: props.useActivitie.trailId,
        success: false,
        timestamp: Date.now(),
        score: 0,
        books: false,
      })
    }

    if (modalCorrectAnswer) {
      const point = chances === 3 ? 10 : chances === 2 ? 8 : chances === 1 ? 5 : 0;
      setScore(point)
      props.registerAction({
        activityId: props.useActivitie.id,
        trailId: props.useActivitie.trailId,
        success: true,
        timestamp: Date.now(),
        score: point,
        books: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalCorrectAnswer, modalWrongAnswer])

  useEffect(() => {
    const { synced, pendingSync } = props.actionsBook;
    const useChancesAtActivity = chancesAtActivity(props.useActivitie.id, [...synced, ...pendingSync]);
    setChances(useChancesAtActivity);
  }, [props.actionsBook, props.useActivitie]);


  const handleIsModalAnswerOption = () => {
    setIsModalAnswerOption(true);
  }

  const handleWrongAnswer = () => {
    setModalWrongAnswer(false);
    setIsModalWithoutScore(undefined);
  }

  const handleWithoutScore = () => {
    setIsModalWithoutScore(undefined);
  }

  const handleCheckAnswer = (answer) => {
    const listActionsBook = [...props.actionsBook.synced, ...props.actionsBook.pendingSync];
    const useAllowScore = allowScore(activitie.trailId, activitie.id, listActionsBook);
    if (useAllowScore) {
      if (answer.isCorrect) {
        setModalCorrectAnswer(true);
        setAnswer(answer);
      } else {
        setChances(chances - 1);
        setModalWrongAnswer(true);
      }
    } else {
      if(answer.isCorrect) {
        showModalAnswer();
        setIsModalWithoutScore(true);
      } else {
        setIsModalWithoutScore(false);
      }
    }
  }

  const handleCloseTutorial = () => {
    setIsTutorial(false);
  }

  const showModalAnswer = () => {
    const useAnswers = activitie.answers.filter(item => item.isCorrect)[0];

    setModalWrongAnswer(false);
    setModalCorrectAnswer(false);
    setShowAnswer({ isModal: true, answer: useAnswers });
  }

  const renderScreen = () => {
    return (
      <>
        <Header title={activitie?.name} />
        <ContentImageText
          image={`data:image/jpeg;base64,${activitie.imageBase64}`}
          title={activitie?.question}
          info={activitie?.complementaryInformation}
          isModal={isModalAnswerOption}
        />
        <Button
          handleClick={handleIsModalAnswerOption}
          buttonBg='#ffd000'
        >
          responder
        </Button>
      </>
    )
  }

  const renderAnswerOption = () => {
    return (
      <OptionsButtons
        options={activitie.answers}
        handleCheckAnswer={handleCheckAnswer}
      />
    )
  }

  return (
    isLoading ? <SplashScreen activitieLogo={logo} /> : (
      <Container>
        {(
          !modalWrongAnswer
          && !modalCorrectAnswer
          && !showAnswer.isModal)
          && renderScreen()
        }
        {isModalAnswerOption && renderAnswerOption()}
        {modalWrongAnswer && isModalWithoutScore === undefined && <WrongAnswer chances={chances} handleClick={handleWrongAnswer} handleShowAnswer={showModalAnswer} errorMessages={activitie.errorMessages} />}
        {isModalWithoutScore === false && <WrongAnswerWithoutScore handleClick={handleWithoutScore} handleShowAnswer={showModalAnswer} />}
        {modalCorrectAnswer && <CorrectAnswer answer={answer} toScore  isTrunk idActivitie={activitie.chestContentId} score={score} />}
        {showAnswer.isModal && <CorrectAnswer answer={showAnswer.answer} noScore={isModalWithoutScore === true} isTrunk idActivitie={activitie.chestContentId} score={score} />}
        {isTutorial && <Tutorial screen={activitie?.name} btnContent='Jogar' handleCloseTutorial={handleCloseTutorial} />}
      </Container>
    )
  );
}

export default DidYouKnow;
