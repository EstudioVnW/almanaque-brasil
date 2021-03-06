import React from 'react';
import styled from 'styled-components';

//Component
import Button from './button';

// Styles
const Content = styled.div`
  padding: 0 1rem;
  width: 100%;
  height: ${props => props.height || '5.3rem'};
	background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top-left-radius: ${props => !props.noBorder && '25px'};
  border-top-right-radius: ${props => !props.noBorder && '25px'};
`;

const Text = styled.p`
  padding-top: .5rem; 
  font-size: .9375rem;
  color: #373737;

  @media(max-width: 320px) {
    font-size: .875rem;
  }
`;

const ContainerButton = ({
  height,
  color,
  buttonBg,
  boxShadow,
  noBorder,
  children,
  isError,
  handleClick,
}) => {
  return (
    <Content height={height} noBorder={noBorder}>
      {isError && <Text>{isError}</Text>}
      <Button
        color={color}
        buttonBg={buttonBg}
        boxShadow={boxShadow}
        handleClick={handleClick}
      >
        {children}
      </Button>
    </Content>
  );
}

export default ContainerButton;
