import React from 'react'
import styled from 'styled-components'

const ContainerAnswer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 425px;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;

  @media (min-width: 1024px) { height: 55%; }
  @media (max-width: 320px) { min-height: 45vh; }
`;

const ContentAnswerOption = styled.button`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95vw;
  max-width: 328px;
  height: 2.313rem;
  font-size: .8rem;
  font-weight: 900;
  color: #373737;
  letter-spacing: .05rem;
  text-transform: uppercase;
  background: #FFD000;
  border-radius: 17px;
  box-shadow: 0 5px 0  #F08800;

  :last-child{
    margin-bottom: 0;
  }
`;

const optionsButtons = ({ options, handleCheckAnswer }) => {
  return (
    <ContainerAnswer>
      {options.map((answer, key) => {
        return (
          <ContentAnswerOption
            onClick={() => handleCheckAnswer(answer)}
            key={key}
          >
            {answer.answer}
          </ContentAnswerOption>
        )
      })}
    </ContainerAnswer>
  )
}

export default optionsButtons
