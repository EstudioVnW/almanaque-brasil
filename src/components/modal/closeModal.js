import React from "react";
import styled from "styled-components";

import Button from "../buttons/button"

const CloseBtn = styled.button`
  text-transform: uppercase;
  font: 900 1.6em 'Nunito';
  color: #373737;
  transform: scale(1,.82);
  transition: .2s ease;
  user-select: none;
  z-index: 111;

  &:hover {
    transform: scale(1.15,.95);
  }
`;

export default function CloseModal({
  handleClick,
  btnMargin,
  btnWidth,
  height,
  btnContent,
  buttonBg,
  isWelcome,
  showThunk,
  resetProgress
}) {
  if (isWelcome) {
    return (
      <>
        <Button
          margin=".5rem 0 .9rem"
          height="2rem"
          buttonBg={buttonBg}
          handleClick={resetProgress || showThunk()}
        >
          {btnContent}
        </Button>
        <CloseBtn onClick={handleClick}>x</CloseBtn>
      </>
    );
  } else {
    return (
      <>
        {btnContent !== undefined ? 
          <Button
            margin=".5rem 0 .9rem"
            btnWidth={btnWidth}
            height={height ? "2.313rem" : "2rem"}
            buttonBg={buttonBg}
            handleClick={handleClick}
          >
            {btnContent}
          </Button>
          : <CloseBtn onClick={handleClick}>x</CloseBtn>
        }
      </>
    )
  };
}