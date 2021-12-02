/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styled from 'styled-components';

// Images
import arrow from '../../images/icons/onboarding/arrow.svg';

// Styles
const Content = styled.div`
  position: relative;
  margin: 1rem auto 0;
  padding: 0 1rem;
  width: 90%;
  border-radius: 8px;
  font-size: 1rem;
  color: #373737;
  font-weight: 900;
  background: #EBEBEB;
  user-select: none;
  cursor: pointer;
`;

const Text = styled.p`
  margin: .75rem 1rem .625rem 0;
  font-weight: ${props => props.active ? '900' : 'normal'};
  color: ${props => props.active ? '#373737' : '#B9B9B9'};
`;

const OptionsBox = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  padding: 1rem .5rem .5rem;
  width: 100%;
  transform: ${props => !props.isOpen && 'translateY(2px)'};
  border-radius: 0 0 8px 8px;
  background: #EBEBEB;
  transition: .2s ease;
  z-index: 1;
`;

const Option = styled.div`
  padding: .6rem .5rem .4rem;
  width: 100%;
  color: #373737;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 8px;
  transition: .4s ease;

  :hover{
    background-color: #F3F3F3;
  }
`;

const Figure = styled.figure`
  position: relative;
  float: right;
  margin: .75rem 0 .625rem 0;
  
  > img {
    width: 70%;
    transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(-90deg)'};
    transition: .2s ease;
  }
`;

const Select = ({ name, value, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(!isOpen)
  };

  const handleSelect = (ev, value) => {
    ev.stopPropagation();
    handleChange({
      target: {
        name: name,
        value: value
      }
    })

    handleCloseModal();
  };

  const renderOptions = () => (
    <OptionsBox>
      <Option onClick={(ev) => handleSelect(ev, 'sim')}>Sim</Option>
      <Option onClick={(ev) => handleSelect(ev, 'não')}>Não</Option>
    </OptionsBox>
  );

  return (
    <Content
      name={name}
      onClick={handleCloseModal}
    >
      <Figure isOpen={isOpen}>
        <img src={arrow}></img>
      </Figure>
      {(value === 'sim' && !isOpen) && <Text active onClick={handleCloseModal}>Sim</Text>}
      {(value === 'não' && !isOpen) && <Text active onClick={handleCloseModal}>Não</Text>}
      {(value === undefined || isOpen) && <Text>Escolha uma opção:</Text>}
      {isOpen && renderOptions()}
    </Content>
  );
}

export default Select;