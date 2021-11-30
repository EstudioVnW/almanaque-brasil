import React, { useState, useEffect, createRef } from 'react';
import TratedText from '../../components/tratedText';
import styled from 'styled-components';

//Component
import Header from '../header';

//Styles
const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 26.5625rem;
  background: #fff;
  height: -webkit-fill-available;
  z-index: 2;
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
    background: #ccc;
    border-radius: 13px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`;

const MessageBox = styled.div`
  position: relative;
  top: -4rem;
  padding: 3rem 1rem 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media(max-width: 425px) {
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

const Img = styled.img`
  width: 100%;
  min-height: 400px;
  max-width: 500px;
  object-fit: fill;

  @media(max-width: 425px) {max-height: 310px;}
  @media(min-width: 1024px) {height: 40vh;  object-fit: cover;}
`;

const Title = styled.h1`
  padding-bottom: 1.3125rem;
  font-size: 1.5rem;
  font-weight: 900;
`;

const Gradient = styled.div`
  position: absolute;
  opacity: .5;
  width: 100%;
  height: 300px;
  background: linear-gradient(144deg, #fff 0%, transparent 50%);
`

const TrunkInfoScreen = ({ itemData, onClick }) => {
  const [showTitle, setShowTitle] = useState(undefined);
  const [data, setData] = useState([]);
  const myRef = createRef();

  useEffect(() => {
    const useData = itemData && itemData;
    setData(useData);
  }, [itemData]);

  const onScroll = () => {
    const scrollTop = myRef.current.scrollTop

    scrollTop >= 200 ? setShowTitle(true) : setShowTitle(false);
  }

  return (
    <Container ref={myRef} onScroll={onScroll}>
      <Header
        positionFixed
        trunkScreen={true}
        showTitle={showTitle}
        title={data?.category}
        goBack={onClick}
      />
      <>
        <Gradient />
        <Img src={`data:image/jpeg;base64,${data?.imageBase64}`} alt='Imagem da atividade' />
      </>
      <MessageBox>
        <Title>
          {data?.title}
        </Title>
        <TratedText>{data?.content}</TratedText>
      </MessageBox>
    </Container>
  );
}

export default TrunkInfoScreen;