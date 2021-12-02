/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styled from 'styled-components';

//Component
import TermOfUse from '../../pages/termsOfUse';

// Styles
const Content = styled.div`
  padding-bottom: 2rem;
  display: flex;
  align-self: start;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;

const Check = styled.button`
  width: 1rem;
  height: 1rem;
  border: 1px solid ${props => props.attention ? '#FF3333' : '#D1D1D1'};
  padding: 1px;
  /* background-color: ${props => props.isSelected ? '#373737' : '#fff'}; */
  border-radius: 5px;
  overflow: hidden;
`
const CheckIcon = styled.div`
  background-color: #373737;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const Text = styled.p`
  padding-left: .5rem;
  font-size: .85rem;
  font-weight: normal;
  color: #373737;
  
  >strong{
    font-weight: 800;
    cursor: pointer;
  }
`;

const Label = styled.label`
  max-width: 300px;
  text-align: center;
  padding: ${props => props.login ? '1rem 0 .5rem' : '2rem 0 .5rem'};
  font-size: 1.5rem;
  font-weight: 900;
  color: #373737;
`;

const CheckBox = ({ attention, isSelected, onClick }) => {
  const [isModalTermOfUse, setIsModalTermOfUse] = useState(undefined);

  const handleModalTermOfUse = () => {
    setIsModalTermOfUse(!isModalTermOfUse);
  }

  return (
    <Content>
      <Check attention={attention} onClick={onClick}>
        {isSelected && <CheckIcon />}
      </Check>
      <Text>Concordo com os <strong onClick={handleModalTermOfUse}>termos de uso</strong> do app...</Text>
      {isModalTermOfUse && <TermOfUse closeModal={handleModalTermOfUse} />}
    </Content>
  );
}

export default CheckBox;