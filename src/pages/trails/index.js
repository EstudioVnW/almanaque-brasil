import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

//Component
import Footer from '../../components/footer/footerMenu';
import Map from './Map';
import ProgressHeader from '../../components/progressHeader';
import TrailCompleted from '../../components/modal/trailCompletedModal';
import AppCompletedModal from '../../components/modal/appCompletedModal';
import { trailState } from '../../utils/trail';
import ErrorModal from "../../components/modal/errorModal";

//Redux
import { selectedTrails } from '../../dataflow/modules/trails-module';
import { clearActivity } from '../../dataflow/modules/activity-module';


const mapStateToProps = state => ({
  trails: state.trails.data,
  actionsBook: state.actionsBook
});

const mapDispatchToProps = dispatch => ({
  selectedTrails: (info) => {
    dispatch(selectedTrails(info));
  },

  clearActivity: () => {
    dispatch(clearActivity());
  },
});

export const Card = styled.button`
  min-height: 150px;
  margin: 10px;
  border-radius: 25px;
  padding: 25px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  > h1,h2 {
    text-decoration: none;
  }
  background-color: #fff;

  &:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

export const Box = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Trails = (props) => {
  const [isModalAppCompleted, setIsModalAppCompleted] = useState(undefined);
  const [isModalTrailCompleted, setIsModalTrailCompleted] = useState({isModal: undefined, trailId: null});
  const [trailsState, setTrailsState] = useState([]);
  const [qtdTrailComplete, setQtdTrailComplete] = useState(0);
  const [errorLoadingTrack, setErrorLoadingTrack] = useState(undefined);

  useEffect(() => {
    const listActionsBook = [...props.actionsBook.synced, ...props.actionsBook.pendingSync];
    let trailsState = props.trails.map(trail => trailState(trail.id, listActionsBook, trail));
    let qtdTrailComplete = trailsState.filter(item => item.state === 'done').length;

    setTrailsState(trailsState);
    setQtdTrailComplete(qtdTrailComplete);

	}, [props.actionsBook, props.trails]);

  useEffect(() => {
    const listActionsBook = [...props.actionsBook.synced, ...props.actionsBook.pendingSync];
    let trailsState = props.trails.map(trail => trailState(trail.id, listActionsBook, trail));
    let qtdTrailComplete = trailsState.filter(item => item.state === 'done').length;
    let isAppComplete = trailsState.length > 0 && qtdTrailComplete === 10;

    if (isAppComplete) {
      setIsModalAppCompleted(true);
    }

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  useEffect(() => {
    let setError = !trails.length && setTimeout(() => setErrorLoadingTrack(true), 2000);

    return () => {
      clearTimeout(setError);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActivities = (trail) => {
    props.history.push({pathname: '/atividades'});
    props.selectedTrails(trail);
  }

  const handleCloseModalCompleteTrail = () => {
    setIsModalTrailCompleted({isModal: false});
  }

  const handleClickModal = () => {
    handleCloseModalCompleteTrail();
    handleActivities(isModalTrailCompleted.trailId);
  }

  const handleClick = (trailId, key) => {
    const isTrailComplete = trailsState.filter(i => i.trailId === trailId.id);

    if(isTrailComplete[0].state === 'done') {
      setIsModalTrailCompleted({isModal: true, trailId: key});
    } else {
      handleActivities(key);
    }
    props.clearActivity();
  }

  const handleCloseModal = () => {
    setIsModalAppCompleted(false);
  }

  const trails = props?.trails;
  return (
    <Box>
      <ProgressHeader
        trails={qtdTrailComplete}
        actionsBook={[...props.actionsBook.synced, ...props.actionsBook.pendingSync]}
      />
      {
        trails && <Map trails={trails} trailsState={trailsState} goToActivitie={handleClick}></Map>
      }
      <Footer screen='trilhas' />

      {isModalTrailCompleted.isModal && <TrailCompleted handleClickModal={handleClickModal} handleCloseModal={handleCloseModalCompleteTrail}/>}
      {isModalAppCompleted && <AppCompletedModal handleCloseModal={handleCloseModal} /> }
      {errorLoadingTrack && <ErrorModal />}
    </Box>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trails);
