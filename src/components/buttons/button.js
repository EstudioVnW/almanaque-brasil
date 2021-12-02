import React from 'react';
import styled, { keyframes } from 'styled-components';

// Styles
const Content = styled.button`
  position: relative;
  padding-top: 5px;
  margin: ${props => props.margin || 'auto'};
	width: ${props => props.btnWidth || '100%'};
	height: ${props => props.height || '2.375rem'};
  max-width: 425px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => props.background || '#fcd029'};
  border-radius: 17px;
	box-shadow: ${props => props.boxShadow || '0 7px 0 #ee892f'};
  
  :disabled {
    background: ${props => props.backgroundDisabled};
    opacity: ${props => props.opacityDisabled || '.4'};
    cursor: initial;
  }
`;

const Image = styled.img`
  margin-right: 1rem;
  width: ${props => props.width || '.9375rem'};
`;

const Btn = styled.p`
  max-width: 300px;
  font-size: .75rem;
	font-weight: 900;
  letter-spacing: .05rem;
	color: ${props => props.color || "#373737"};
  text-transform: uppercase;
`;

// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  position: absolute;
  right: 1rem;
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Button = ({
  btnWidth,
  height,
  width,
  buttonBg,
  boxShadow,
  children,
  disabled,
  handleClick,
  margin,
  color,
  isIcon,
  icon,
  isLoading,
}) => {
  return (
    <Content
      btnWidth={btnWidth}
      height={height}
      background={buttonBg}
      boxShadow={boxShadow}
      margin={margin}
      disabled={disabled}
      onClick={handleClick}
    >
      {isIcon && <Image src={icon}  alt='' width={width}/>}
      <Btn color={color}>{children}</Btn>
      {isLoading && <Loader />}
    </Content>
  );
}

export default Button;
