/* eslint-disable no-lone-blocks */
import React from 'react';
import styled from 'styled-components';

//Component
import aliases from './aliases';
import skeleton from '../../../images/trails/map/skeleton.svg'

const AlignToCenter = styled.main`
  min-width: 425px;
  height: 100%;
  background-color: #ebeeec;
  overflow: hidden;
  z-index: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 320px) {
    bottom: -32px;
  }
`;

const MapBackground = styled.div`
  position: fixed;
  bottom: 1rem;
  max-width: 425px;
  transform: scaleY(.975);
  min-height: 100%;
  height: -webkit-fill-available;
  
  @media (max-width: 400px) {
    bottom: -.5rem;
    left: -1.5rem;
    transform: scaleY(.9);
  }
  
  @media (max-width: 320px) {
    left: -.5rem;
    bottom: -1.5rem;
    transform: scale(.8,.8);
  }
`;

const MapFragment = styled.div`
  position: absolute;
  left: ${props => props.left};
  bottom: ${props => props.bottom};
  display: unset;
  transform: scale(1.03,1.028);
  z-index: ${props => props.esmeralda ? '2' : '1'};
`;

const Stone = styled.img`
  position: absolute;
  top: ${props => props.top};
  right: ${props => props.right};
  max-width: 5.25rem;
  transform: scale(1.22,1.25);
  cursor: pointer;

  @media (max-width: 400px) {
    transform: scale(1.05,1.2);
  }
`;

const Skeleton = styled.img`
  position: absolute;
  bottom: 6px;
  width: 426.5px;
  z-index: -1;
`;

const Map = ({ trails, trailsState, goToActivitie }) => {
  const handleMapFragmentClick = (trail, key) => {
    trail.isActive ? goToActivitie(trail, key) : alert(`Trilha ${trail.name} bloqueada`)
  }

  return (
    <AlignToCenter>
      <MapBackground>
        {trails.map((trail, key) => {
          const aliasesName = aliases[trail.name];
          const useTrailsState = trailsState?.filter(item => item?.trailId === trail?.id && item?.state)[0]?.state || 'todo';
          return (
            <MapFragment
              key={key}
              left={aliasesName.position.left}
              bottom={aliasesName.position.bottom}
              type="image/svg+xml"
              esmeralda={trail.name === 'Esmeralda'}
              onClick={() => handleMapFragmentClick(trail, key)}
            >
              <Stone
                top={aliasesName.stone.position.top}
                right={aliasesName.stone.position.right}
                src={aliasesName.stone.state.[useTrailsState]}
                alt={aliasesName.name}
              />
              <img src={aliasesName.img}  alt='mapa'/>
            </MapFragment>
          )
        })}
        <Skeleton src={skeleton} />

      </MapBackground>
    </AlignToCenter>
  );
}

export default Map;