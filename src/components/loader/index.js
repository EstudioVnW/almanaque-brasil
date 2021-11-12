import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from 'axios';

//Image
import home from '../../images/dialogBox/dialogBoxLittle.svg';
import elifas from '../../images/elifas/waving.svg';

const AnimBall = keyframes`
  0%{transform: translateY(0)}
  50%{transform: translateY(75%)}
  100%{transform: translateY(0)}
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #909090;
  align-items: center;
  justify-content: center;
`;

const BoxLoader = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 4.625rem;
  width: 60px;
  /* height: 40px; */
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Ball = styled.div`
  width: 8px;
  height: 8px;
  background: #373737;
  border: none;
  border-radius: 50%;
  animation: ${AnimBall} 1s ease infinite;
  animation-delay: ${(props) => props.animDelay};
`;

const Title = styled.h2`
  margin-bottom: 18px;
  width: 280px;
  font-size: 24px;
  font-weight: 900;
  color: #373737;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #373737;
`;

const Box = styled.div`
  background-image: url(${home});
  background-size: 97%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 340px;
  height: 277px;
  border-radius: 20px;

  @media (max-width: 320px) {
    width: 100%;
  }
`;
const BoxElifas = styled.div`
  display: flex;
  width: 169px;
  height: 231px;
  position: relative;
  background-image: url(${elifas});
`;

const BoxContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Loader = ({ dashboard }) => {

  useEffect(() => {
    if (dashboard === true) handleCleanCaches();
  })

  const handleCleanCaches = async () => {
    const idToken = localStorage.getItem('idToken');
    const savedVersion = localStorage.getItem('version');
    let madeRequisition = false;

    try {
      if (madeRequisition === false) {
        const response = await axios({
          method: 'get',
          // url: process.env.REACT_APP_VERSION_ENDPOINT,
          url: 'https://5ltaa6klie.execute-api.us-east-1.amazonaws.com/dev/version',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${idToken}`,
          },
        })
        
        const dataResponse = response?.data.Items[0]?.version;
        const version = !!dataResponse ? dataResponse : 0;
        
        madeRequisition = !!dataResponse && true;
        
        if (savedVersion < version) {
          // clean caches
          if ('caches' in window) {
            caches.keys().then((names) => {
              // Delete all the cache files
              names.forEach(name => {
                caches.delete(name);
              })
            });
          }
          localStorage.setItem('version', version)
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Box>
        <>
          <Title>Espere só mais um pouquinho!</Title>
          <Text>Estamos carregando o conteúdo.</Text>
        </>
        <BoxLoader>
          <Ball />
          <Ball animDelay=".2s" />
          <Ball animDelay=".4s" />
        </BoxLoader>
      </Box>
      <BoxContainer>
        <BoxElifas />
      </BoxContainer>
    </Container>
  );
};

export default Loader;
