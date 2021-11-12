import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  useParams,
} from "react-router-dom";

import { register } from '../../dataflow/modules/actionsBook-modules'

//Components
import WhatIsWhatIs from './whatIsWhatIs';
import WhoseEyesAreThese from './whoseEyesAreThese';
import InfoScreen from './infoScreen';
import DidYouKnow from './didYouKnow';
import IfTurnsOn from './ifTurnsOn';
import OurStuff from './ourStuff';
import EnigmaticWord from './enigmaticWord';

const mapStateToProps = state => ({
  activities: state.trails,
  selectedTrails: state.trails.selectedTrails,
  actionsBook: state.actionsBook,
  isActivityLimit: state.modals.isActivityLimit,
})

const mapDispatchToProps = dispatch => ({
  registerAction: (info) => {
    dispatch(register(info));
  },
});

// Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  background: #f3f3f3;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #f3f3f3;
`;

const Activities = (props) => {
  const [activities, setActivities] = useState(null);
  const [currentActivitie, setCurrentActivitie] = useState(1);
  const { trailId } = useParams();
  const [isResend, setIsResend] = useState(false);

  const handleResendModal = () => {
    setIsResend(false);
  };

  useEffect(() => {
    const trail = props.selectedTrails;
    const allActivities = props.activities.data[trail].activities;

    setActivities(allActivities);
  }, [props.activities.data, props.selectedTrails]);

  useEffect(() => {
    const convertIdToNumber = parseInt(trailId);

    setCurrentActivitie(convertIdToNumber);
  }, [trailId]);

  const renderActivitie = (currentActivitie, registerAction) => {
    // Renderizar component de acordo com o tipo de ativivdade
    switch (currentActivitie.type) {
      case "de-quem-sao-esses-olhos":
        return <WhoseEyesAreThese registerAction={registerAction} useActivitie={currentActivitie} actionsBook={props.actionsBook}/>

      case "o-que-e-o-que-e":
        return <WhatIsWhatIs registerAction={registerAction} useActivitie={currentActivitie} actionsBook={props.actionsBook}/>

      case "coisas-nossas":
        return <OurStuff registerAction={registerAction} useActivitie={currentActivitie} actionsBook={props.actionsBook}/>;
      
      case "origem-da-expressao":
        return <InfoScreen registerAction={registerAction} useActivitie={currentActivitie} isShowLogo actionsBook={props.actionsBook}/>

      case "eureka":
        return <InfoScreen registerAction={registerAction} useActivitie={currentActivitie} eureka actionsBook={props.actionsBook}/>
      
      case "voce-sabia":
        return <DidYouKnow history={props.history} registerAction={registerAction} useActivitie={currentActivitie} actionsBook={props.actionsBook}/>

      case "se-liga":
        return <IfTurnsOn registerAction={registerAction} useActivitie={currentActivitie} actionsBook={props.actionsBook} history={props.history} />

      case "palavra-enigmatica":
        return <EnigmaticWord history={props.history} registerAction={registerAction} activitie={currentActivitie} actionsBook={props.actionsBook}/>

      default:
        return <h1>{currentActivitie.question}</h1>;
    }
  }

  return (
    <Container>
      {
        activities && activities.length > 0
          ? renderActivitie(activities[currentActivitie-1], props.registerAction)
          : <Title>Carregando</Title>
      }

      {/*{!activities.length && <ModalErro />} */}
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
