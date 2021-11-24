import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

//Components
import Header from '../../components/header';
import ActivitieIcon from '../../components/activities/activitieIcon';
import Way from '../../components/trail/way';
import ActivitiesCompleted from '../../components/modal/activitiesCompletedModal';
import activityDesign from './activityDesign';
import OfflineModal from "../../components/modal/offlineModal";
import ModalNoActivity from "../../components/modal/errorModal";

//Redux
import { postActionsBook } from '../../dataflow/thunks/actionsBook-thunks';
import { selectedActivity } from '../../dataflow/modules/activity-module';
import { setIsModalActivityLimit } from '../../dataflow/modules/modals-module';

const mapStateToProps = state => ({
  activities: state.trails,
  selectedTrails: state.trails.selectedTrails,
  selectedActivity: state.activity.selectedActivity,
  actionsBook: state.actionsBook,
  isActivityLimit: state.modals.isActivityLimit,
})

const mapDispatchToProps = dispatch => ({
  postActionsBook: (info) => {
    dispatch(postActionsBook(info));
  },
  handleselectedActivity: (info) => {
    dispatch(selectedActivity(info));
  },
  setIsModalActivityLimit: (info) => {
    dispatch(setIsModalActivityLimit(info));
  },
});

// Styles
const Container = styled.div`
  position: fixed;
  width: 100%;
  max-width: 425px;
  height: 100vh;
  background-color: #FAFAFA;
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
`;

const Stone = styled.div`
  display: flex;
  justify-content: center;
  padding: ${props => props.padding || '6rem 0 5rem'};
  
  img {
    width: ${props => props.width};
  }
`;

const TextLoading = styled.h1`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentAct = styled.div`
  display: block;
`;

const Trail = styled.div`
  display: flex;
  width: 375px;
  background-color: transparent;
  overflow: hidden;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  
  h1 {
    padding-top: 5rem;
  }
`;

const ActivitiesRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const Activities = (props) => {
  const [score, setScore] = useState(0);
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [activitiesProgress, setActivitiesProgress] = useState(undefined);
  const [isModalActivitiesCompleted, setIsModalActivitiesCompleted] = useState(undefined);

  const activityName = activityDesign && activityDesign[currentActivity];

  const backgroundDecorations = {
    top: activityName?.houses?.church,
    center: activityName?.houses?.houses,
    bottom: activityName?.houses?.trainStation
  }

  useEffect(() => {
    if (activities === null) return

    let canBeDone = true;

    const activitiesStates = activities && activities.map((activitie) => {
      const isDoneActivitie = isDone(activitie.id);
      const activitieState = isDoneActivitie ? isDoneActivitie : defineState(canBeDone && !isDoneActivitie)
      if (!isDoneActivitie) canBeDone = false;
      return { id: activitie.id, state: activitieState }
    });

    setActivitiesProgress(activitiesStates);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities]);

  useEffect(() => {
    const trail = props.selectedTrails;
    const allActivities = props?.activities?.data[trail]?.activities;
   
    setActivities(allActivities);
  }, [props.selectedTrails, props.activities.data]);

  useEffect(() => {
    const lastActivitiesProgress = activitiesProgress && activitiesProgress[activitiesProgress.length - 1];
    const lastActivityDone = lastActivitiesProgress?.state === 'right' || lastActivitiesProgress?.state === 'wrong';

    if(lastActivityDone) { 
      const idLastActivitiesProgress = lastActivitiesProgress.id
      let lastActivity = props.selectedActivity === idLastActivitiesProgress;

      setIsModalActivitiesCompleted(lastActivity);
    }
  }, [activitiesProgress, props.selectedActivity]);


  useEffect(() => {
    const listActionsBook = [...props.actionsBook.synced, ...props.actionsBook.pendingSync];
    
    let totalScore;

    if (listActionsBook.length > 0) {
      let pendingList = listActionsBook.filter(action => action.success === true);
      let trailId = listActionsBook[listActionsBook.length - 1]?.trailId;

      const points = pendingList
      .filter(action => action.trailId === trailId)
      .map(action => action.score);

      if (points.length > 1) {
        totalScore = points.length > 0 && points.reduce((prev, cur) => prev + cur);
      } else {
        totalScore = +points.join("");
      }
    } else {
      console.log("no pendingSync actions");
    }

    if (totalScore > 0) {
      setScore(totalScore);
    }
  }, [props.actionsBook]);
  
  useEffect(() => {
    if(props.actionsBook.pendingSync.length > 0) {
      props.postActionsBook(props.actionsBook);
    }
  }, [props]);

  useEffect(() => {
    const useCurrentActivity = props?.activities?.data[props.selectedTrails]?.name;

    setCurrentActivity(useCurrentActivity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerNextActivitie = (index, activityId) => {
    props.handleselectedActivity(activityId);

    props.history.push({
      pathname: `/atividade/${index + 1}`,
    });
  }

  const handleCloseModal = () => {
    props.setIsModalActivityLimit(false);
  }

  const renderActivities = () => {
    // logic for deciding whether to return one or two items in a row
    if (activitiesProgress === undefined) return
    let nextItemIsSingular = true;

    return activities.map((item, index, array) => {
      if (nextItemIsSingular) {
        nextItemIsSingular = false
        return (
          <ActivitiesRow key={index}>
            <ActivitieIcon
              activitieState={activitiesProgress[index]?.state}
              item={item}
              itemValue={index}
              onClick={() => handlerNextActivitie(index, item.id)}
              history={props.history}
              iconBloqued={activityName?.stone?.bloqued}
              iconVisualized={activityName?.stone?.visualized}
            >{index}</ActivitieIcon>
          </ActivitiesRow>
        )
      } else {
        if ((index + 1) % 3 === 0) {
          nextItemIsSingular = true

          // skip this rendering
          return null
        } else {
          return (
            <ActivitiesRow key={index}>
              <ActivitieIcon
                activitieState={activitiesProgress[index]?.state}
                item={item}
                itemValue={index}
                lineTo={'straight'}
                onClick={() => handlerNextActivitie(index, item.id)}
                history={props}
                iconBloqued={activityName?.stone?.bloqued}
                iconVisualized={activityName?.stone?.visualized}
              >{index}</ActivitieIcon>

              <ActivitieIcon
                activitieState={activitiesProgress[index + 1]?.state}
                item={array[index + 1]}
                itemValue={index + 1}
                lineTo={'left'}
                onClick={() => handlerNextActivitie(index + 1, item.id)}
                history={props}
                iconBloqued={activityName?.stone?.bloqued}
                iconVisualized={activityName?.stone?.visualized}
              >{index + 1}</ActivitieIcon>
            </ActivitiesRow>
          )
        }
      }
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function isDone(activityId) {
    const actionsBook = [...props.actionsBook.synced, ...props.actionsBook.pendingSync]
    if (actionsBook === undefined) return

    const filteredActions = actionsBook.filter((action) => {
      return action.activityId === activityId
    })

    let isActivityError = filteredActions.length >= 3 && filteredActions.filter(item => !item.success);

    if (isActivityError.length >= 3) return 'wrong'
    else if (filteredActions.length > 0) {
      const checkIfIsDone = filteredActions.findIndex((action) => {
        return action.success === true
      });

      return checkIfIsDone === -1 ? false : 'right'
    } else return false
  }

  function defineState(canBeDone) {
    if (canBeDone) return "waiting"
    else return "bloqued"
  }

  const renderStone = () =>  (
    <Stone width='12rem'>
      <img
        src={activityName?.stone.stone}
        alt={activityName?.name}
      />
    </Stone>
  )

  const renderLogoStone = () => (
    <Stone padding='4rem 0 2rem 0' width='4rem'>
      <img
        src={activityName?.stone.logo}
        alt={activityName?.name}
      />
    </Stone>

  )

  const screen = () => (
    <>
      <Header
        title={activityName?.name}
        positionFixed
        background='#fafafa'
        boxShadow
        goBack={() => { props.history.push('/trilhas') }}
      />
<ContentAct>

      {renderStone()}

      <Trail>
        {activities && activityName &&
          <Way
            progress={activitiesProgress}
            backgroundDecorations={backgroundDecorations}
            linesQuantity={activities.length - 1}
            lineColor={activityName?.color}
          />
        }
        
        {renderActivities()}
      </Trail>

      {renderLogoStone()}
</ContentAct>

    </>
  )

  return (
    <Container>
      {
        activities && activities.length > 0 
        ? screen() : <TextLoading>Carregando...</TextLoading>
      }
      {isModalActivitiesCompleted && <ActivitiesCompleted score={score} history={props.history}/>}
      {props.isActivityLimit && <OfflineModal handleCloseModal={() => handleCloseModal()}/>}
      {!activities.length && <ModalNoActivity />}
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
