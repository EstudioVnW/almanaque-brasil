/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import styled from 'styled-components';

// Assets
import trophiesIcon from '../../images/icons/progressHeader/trophies.svg'
import booksIcon from '../../images/icons/progressHeader/books.svg'
import trailsIcon from '../../images/icons/progressHeader/trails.svg'

import { getPointsAtTrail, getBookBadges } from '../../utils/statistics'

const Row = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  top: .938rem;
  width: 100%;
  z-index: 2;
`;

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 43px;
  border-radius: 4px;
  background-color: #FFD000;

  img{
    position: relative;
    left: 0px;
    width: 22px;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  @media (max-width: 320px) { width: 30%; }
`;

const ValueBox = styled.div`
  width: 66px;
  padding: 2px 0 2px 0;
  border: 2px solid #D8D3D3;
  border-left: none;
  border-radius: 0px 6px 6px 0;
  text-align: center;
  font-weight: 800;
  font-size: 1.2rem;
  background-color: #fff;
`;

export default ({ points = 0, trails, books = 0, actionsBook }) => {
  const score = getPointsAtTrail({ actionsBook: actionsBook });
  const trailComplete = trails || 0;
  const bookBadges = getBookBadges({ actionsBook: actionsBook });
  const items = [
    { value: score, icon: trophiesIcon },
    { value: trailComplete, icon: trailsIcon },
    { value: bookBadges, icon: booksIcon }
  ]

  return (
    <Row>
      {items.map((item, i) => {
        return <Item key={i}>
          <Square><img src={item.icon} alt="icon" /></Square>
          <ValueBox>{item.value}</ValueBox>
        </Item>
      })}
    </Row>
  );
}
