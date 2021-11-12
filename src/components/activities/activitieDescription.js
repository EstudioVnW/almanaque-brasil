import React from 'react'
import styled from 'styled-components'

//Styled
const Container = styled.div`
  width: 80%;
  height: 65%;
  margin: auto 0;
  padding-top: ${props => props.isModal && '1rem'};
  ${({ isModal }) => isModal && `flex: 1`};
  display: flex;
  align-items: center;
  flex-direction: column;

  overflow-y: auto; 
  ::-webkit-scrollbar {
    width: 4px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 13px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;

const ImgBox = styled.figure`
  width: 100%;
  height: 11rem;
  border-radius: 15px;
  overflow: hidden;

  @media (max-width: 380px) { height: 8.5rem; }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
`;

const Title = styled.h1`
  padding: 1rem 0 44px;
  color: #373737;
  font-size: 1em;
  font-weight: 800;
  line-height: 1.3rem;
  text-align: center;

  @media (max-width: 425px) { padding-bottom: 1.3rem; }
`;

const Text = styled.p`
  padding-bottom: 1rem;
  color: #373737;
  font-size: .85rem;
`;

const ContentImageText = ({ isModal, image, title, info }) => {
  return (
    <Container isModal={isModal}>
      <ImgBox>
        <Img src={image} alt={"imagem da atividade"}  />
      </ImgBox>
      {title && <Title>{title}</Title>}
      {info && !isModal && <Text>{info}</Text>}
    </Container>
  )
}

export default ContentImageText;
