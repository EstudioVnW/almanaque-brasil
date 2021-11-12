import React from "react";
import styled from "styled-components";

import Button from "../buttons/button"

const CloseBtn = styled.button`
  text-transform: uppercase;
  font: 900 1.6em 'Nunito';
  color: #373737;
  transform: scale(1,.82);
  z-index: 111;
`;

export default function CloseModal({
  handleClick,
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