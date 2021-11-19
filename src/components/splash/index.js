import React, { useEffect } from 'react';
import styled from 'styled-components';

//Images
import almanaque from '../../images/logo/almanaque.svg';
import footer from '../../images/footerSplash.svg';

//Styled
const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  text-align: center ;
  background-color: #fff;
`;

const Logo = styled.img`
  padding-top: 6.625rem;
`;

const Footer = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const SplashPresentation = () => {

  useEffect(() => {
    // clean caches
    if ('caches' in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach(name => {
          caches.delete(name);
        })
      });
    }
  }, [])

  return (
    <Container>
      <Logo src={almanaque} alt="Logo almanaque" />
      <Footer src={footer} alt="Img de fundo" />
    </Container>
  );
}

export default SplashPresentation;