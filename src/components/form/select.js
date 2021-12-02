/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styled from 'styled-components';

// Images
import arrow from '../../images/icons/onboarding/arrow.svg';

// Styles
const Content = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
  width: 100%;
  border-radius: 8px;
  font-size: 1rem;
  color: #373737;
  background: #fff;
  font-weight: 900;
`;

const Text = styled.p`
  margin: .75rem 1rem .625rem 0;
  font-weight: ${props => props.active ? '900' : 'normal'};
  color: ${props => props.active ? '#373737' : '#B9B9B9'};
`;

const Option = styled.div`
  padding: .25rem 0 .25rem .25rem;
  width: 100%;
  border-radius: 8px;
  font-size: 1rem;
  color: #373737;
  background: #fff;
  font-weight: 900;

  :hover{
    background-color: #F3F3F3;
  }
`;

const Figure = styled.figure`
  position: relative;
  float: right;
  margin: .75rem 0 .625rem 0;
  
  >img{
    width: 70%;
    transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(-90deg)'};
  }
`;

const Select = ({ name, value, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleCloseModal = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (ev, value) => {
    ev.stopPropagation();
    handleChange({
      target: {
        name: name,
        value: value
      }
    })

    handleCloseModal();
  }

  const renderOptions = () => (
    <>
      <Option onClick={(ev) => handleSelect(ev, 'sim')}>Sim</Option>
      <Option onClick={(ev) => handleSelect(ev, 'não')}>Não</Option>
    </>
  )


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