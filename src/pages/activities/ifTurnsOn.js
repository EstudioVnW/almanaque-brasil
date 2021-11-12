import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//Utils
import { chancesAtActivity } from '../../utils/statistics';
import { allowScore } from '../../utils/activity';
import { shuffle } from '../../utils';

// Component
import Header from '../../components/header';
import ContainerButton from '../../components/buttons/containerButton';
import WrongAnswer from '../../components/activities/wrongAnswer';
import WrongAnswerWithoutScore from '../../components/activities/wrongAnswerWithoutScore';
import SplashScreen from './splashScreen';
import ScoreScreen from '../../components/activities/scoreScreen';
import Tutorial from '../../components/modal/tutorialModal';

//Images
import logo from '../../images/logo/ifTurnsOn.svg';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 85%;
  background: ${props => !props.isCorrectAnswer && '#fff'};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  @media (max-width: 320px) {
    overflow: auto;
    padding-top: .5rem;
    height: ${props => props.isCorrectAnswer ? '100%' : '85%'} ;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContentInfo = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  user-select: none;
  background-color: ${props => (props.isCorrectAnswer && 'none') || props.backgroundColor};
  
  img {
    border-radius: 8px;
    box-shadow: 0 3px 6px #00000029;
    opacity: ${props => (props.isCorrectAnswer && '1') || props.opacity}
  }
`;

const Text = styled.div`
  width: 7rem;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .875rem;
  color: #373737;
  font-weight: 900;
  border-radius: 8px;
  box-shadow: ${props => props.isCorrectAnswer ? 'none' : '0 3px 6px #00000029'};
`;

const TextCorrectAnswer = styled.h1`
  padding-bottom: 2rem;
  font-size: .9375rem;
  color: #373737;
  font-weight: 900;
  text-align: center;
`;

const Box = styled.div`
  padding: 0 3rem;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content:  ${props => props.isCorrectAnswer ? 'space-evenly' : 'space-between'};

  @media (max-width: 320px) {
    padding: 0 2rem;
  }
  @media (min-width: 768px) {
    padding: 0 4rem;
  }
`;

function IfTurnsOn({ useActivitie, registerAction, actionsBook, history }) {
  const colors = {
    green: "#00FFEA", orange: "#F29F32", blue: "#8EBEFF", yellow: "#FFD932"
  }
  const availableColorsInit = [
    colors.green, colors.green,
    colors.orange, colors.orange,
    colors.blue, colors.blue,
    colors.yellow, colors.yellow
  ]
  const [selectedItems, setSelectedItems] = useState([]);
  const [pairs, setPairs] = useState(undefined);
  const [availableColors, setAvailableColors] = useState(availableColorsInit);
  const [activitie, setActivitie] = useState(undefined);
  const [isModalTip, setIsModalTip] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true)
  const [modalWrongAnswer, setModalWrongAnswer] = useState(undefined);
  const [chances, setChances] = useState(null);
  const [inMemoryItem, setInMemoryItem] = useState(undefined);
  const [hasItemInMemory, setHasItemInMemory] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(undefined);
  const [isModalCorrectAnswer, setIsModalCorrectAnswer] = useState(false);
  const [isError, setIsError] = useState(undefined);
  const [isTutorial, setIsTutorial] = useState(undefined);
  const [isModalWithoutScore, setIsModalWithoutScore] = useState(undefined);
  const [score, setScore] = useState(undefined)

  useEffect(() => {
    inMemoryItem === undefined
      ? setHasItemInMemory(false)
      : setHasItemInMemory(true)
  }, [inMemoryItem]);

  useEffect(() => {
    const newArrayOfActivities = useActivitie?.pairs.map((pair, i) => {
      return {
        id: i,
        ...pair,
        backgroundColor: "#fff"
      }
    });
    setActivitie(useActivitie);
    setPairs(shuffle(newArrayOfActivities));
  }, [useActivitie]);

  useEffect(() => {
    if (useActivitie.trailId === 0) {
      setIsTutorial(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!!useActivitie) setIsLoading(false)
    }, 2000);
    return () => clearTimeout(timer);
  }, [useActivitie]);

  useEffect(() => {
    const listActionsBook = [...actionsBook.synced, ...actionsBook.pendingSync];
    const useChancesAtActivity = chancesAtActivity(useActivitie.id, listActionsBook);
    setChances(useChancesAtActivity);
  }, [actionsBook, useActivitie.id]);

  const handleModalTip = () => {
    setIsModalTip(!isModalTip)
  };

  useEffect(() => {
    if (modalWrongAnswer) {
      registerAction({
        activityId: useActivitie.id,
        trailId: useActivitie.trailId,
        success: false,
        timestamp: Date.now(),
        score: 0,
        books: false,
      })
    }

    if (isModalCorrectAnswer) {
      const point = chances === 3 ? 10 : chances === 2 ? 8 : chances === 1 ? 5 : 0;
      setScore(point)
      registerAction({
        activityId: useActivitie.id,
        trailId: useActivitie.trailId,
        success: true,
        timestamp: Date.now(),
        score: point,
        books: false,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalCorrectAnswer, modalWrongAnswer]);

  const handleClick = (item) => {
    const itemIndex = isSelected(item)
    if (itemIndex < 0) {
      if (inMemoryItem !== undefined) add(item, inMemoryItem)
      else add(item)

    } else {
      if (inMemoryItem === undefined) remove(itemIndex, item)
      else if (inMemoryItem !== undefined & checkBackgroundColor(item, inMemoryItem)) {
        remove(itemIndex, item)
      }
    }

    setIsError(false);
  }

  const handleCorrectAnswer = () => {
    let pairsList = [];
    let newPairsList = [];

    pairs.forEach(element => {
      const pair = element.matchingPair;

      const includesItem = pairsList.includes(pair);

      if (!includesItem) {
        pairsList.push(pair);
      }
    });

    newPairsList = pairsList.map(el =>
      pairs.filter(element => {
        return element.matchingPair === el;
      })
    );

    setPairs(newPairsList.flat(Infinity))
    return
  }

  const handleContinue = () => {
    handleModalCorrectAnswer();
    setIsCorrectAnswer(true);
  }

  const handleCloseTutorial = () => {
    setIsTutorial(false);
  }

  const checkBackgroundColor = (item, inMemoryItem) => {
    return item.backgroundColor === inMemoryItem.backgroundColor ? true : false
  }

  const isSelected = (item) => {
    const validation = selectedItems.findIndex((x) => {
      return x.id === item.id;
    })

    return validation
  }

  const remove = (index, item) => {
    const newSelectedItems = selectedItems
    const removed = newSelectedItems[index]
    newSelectedItems.splice(index, 1);

    if (hasItemInMemory) {
      const newAvailableColors = availableColors;
      newAvailableColors.unshift(item.backgroundColor);
      newAvailableColors.unshift(item.backgroundColor);
      setSelectedItems(newSelectedItems)
      setBackgroundColor(item, "#fff")
      setInMemoryItem(undefined)
      setAvailableColors([...newAvailableColors]);

    } else {
      setSelectedItems(newSelectedItems)
      setBackgroundColor(item, "#fff")
      setInMemoryItem({
        index: index,
        ...removed
      })
    }
  }

  const add = (item, inMemoryItem) => {
    if (inMemoryItem) {
      const newSelectedItems = selectedItems;
      newSelectedItems.splice(inMemoryItem.index, 0, {
        id: item.id,
        type: item.type,
        matchingPair: item.matchingPair,
        backgroundColor: inMemoryItem.backgroundColor
      })

      setSelectedItems(newSelectedItems)
      setBackgroundColor(item, inMemoryItem.backgroundColor)
      setInMemoryItem(undefined)
      return null
    }
    const color = choiceColor()
    setBackgroundColor(item, color)
    setSelectedItems([
      ...selectedItems,
      {
        id: item.id,
        type: item.type,
        matchingPair: item.matchingPair,
        backgroundColor: color
      }
    ])
    return null
  }

  const handleModalCorrectAnswer = () => {
    setIsModalCorrectAnswer(!isModalCorrectAnswer);
  }

  const isCorrect = () => {
    let isCorrect = true;
    selectedItems.map((item, i, array) => {
      if (i % 2 === 0) return null
      const par = [array[i], array[i - 1]]
      if (par[0].matchingPair !== par[1].matchingPair) return isCorrect = false;
      return null
    });

    return isCorrect;
  }

  const handleSubmit = () => {
    const isError = pairs.filter(item => item.backgroundColor === "#fff").length > 0;
    const listActionsBook = [...actionsBook.synced, ...actionsBook.pendingSync];
    const useAllowScore = allowScore(useActivitie.trailId, useActivitie.id, listActionsBook);

    if (selectedItems.length < pairs.length || isError) {
      setIsError(true);
      return;
    }
    if (isCorrectAnswer) {
      // handlerNextActivitie();
      history.goBack();
    }
    if (useAllowScore) {
      //pode pontuar
       if (isCorrect()) {
        handleCorrectAnswer();
        handleModalCorrectAnswer();
      } else {
        setModalWrongAnswer(true);
        setChances(chances - 1);
      }
    } else {
      if (isCorrect()) {
        setIsCorrectAnswer(true);
        setIsModalWithoutScore(true);
      } else {
        setIsModalWithoutScore(false);
      }
    }
  }

  const handleWrongAnswer = () => {
    setModalWrongAnswer(false);
    setIsModalWithoutScore(undefined);
  }

  const showModalAnswer = () => {
    setModalWrongAnswer(false);
    setIsCorrectAnswer(true);
    handleCorrectAnswer();
    setIsModalWithoutScore(undefined);
  }

  const setBackgroundColor = (item, color) => {
    const itemInd = pairs.findIndex(x => {
      return x.id === item.id;
    })

    const newArray = pairs
    newArray[itemInd].backgroundColor = color

    setPairs([...newArray])
  }

  const choiceColor = () => {
    const newAvailableColors = availableColors;
    const selected = newAvailableColors.shift();
    setAvailableColors([...newAvailableColors]);
    return selected;
  }

  const setOpacity = (color) => {
    if (color !== "#fff") return ".3"
    return "1.0"
  }

  const renderScreen = () => {
    return (
      <Box isCorrectAnswer={isCorrectAnswer}>
        <div>
          {
            pairs?.map((item, i) => (
              item.type === "image" && (
                <ContentInfo key={i}
                  backgroundColor={item.backgroundColor}
                  isCorrectAnswer={isCorrectAnswer}
                  onClick={() => handleClick(item)}
                  opacity={setOpacity(item.backgroundColor)}>
                  <img src={`data:image/jpeg;base64,${item.imageBase64}`} isCorrectAnswer={isCorrectAnswer} alt={`img-${item.matchingPair}`} />
                </ContentInfo>
              )
            ))
          }
        </div>
        <div>
          {
            pairs?.map((item, i) => (
              item.type === "text" && (
                <ContentInfo key={i}
                  backgroundColor={item.backgroundColor}
                  isCorrectAnswer={isCorrectAnswer}
                  onClick={() => handleClick(item)}>
                  <Text isCorrectAnswer={isCorrectAnswer}>{item.text}</Text>
                </ContentInfo>
              )))
          }
        </div>
      </Box>
    )
  }

  return (
    isLoading ? <SplashScreen activitieLogo={logo} /> : (
      <Container>
        {!isCorrectAnswer && (
          <Header
            title={activitie.name}
            tips={activitie.tips}
            isSelectedTips={isModalTip}
            handleModalTip={handleModalTip}
          />
        )}
        <Content isCorrectAnswer={isCorrectAnswer}>
          <ContentBox>
            {isCorrectAnswer && <TextCorrectAnswer>A resposta é:</TextCorrectAnswer>}
            {renderScreen(pairs)}
          </ContentBox>
          <ContainerButton
            color={isCorrectAnswer && '#fff'}
            buttonBg={isCorrectAnswer ? '#399119' : '#ffd000'}
            boxShadow={isCorrectAnswer && '0 7px 0 #245812'}
            noBorder={!isCorrectAnswer}
            isCorrectAnswer={isCorrectAnswer}
            isError={isError && 'Você precisa selecionar todos os items'}
            handleClick={handleSubmit}
          >
            {isCorrectAnswer ? 'continuar trilha' : 'conferir resposta'}
          </ContainerButton>
        </Content>
        {modalWrongAnswer && isModalWithoutScore === undefined && <WrongAnswer chances={chances} handleClick={handleWrongAnswer} handleShowAnswer={showModalAnswer} />}
        {isModalCorrectAnswer && isModalWithoutScore === undefined && <ScoreScreen score={score} handleClick={handleContinue} />}
        {isModalWithoutScore === false && <WrongAnswerWithoutScore handleClick={handleWrongAnswer} handleShowAnswer={showModalAnswer} />}
        {isTutorial && <Tutorial screen={activitie?.name} btnContent='Jogar' handleCloseTutorial={handleCloseTutorial} />}
      </Container>
    )
  )
}

export default IfTurnsOn;
