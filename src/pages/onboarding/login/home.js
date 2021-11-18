import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

// Redux modules
import { signIn } from '../../../dataflow/modules/signIn-modules';
import { getActionsBook } from '../../../dataflow/thunks/actionsBook-thunks';

//Components
import Button from '../../../components/buttons/button';
import SplashAlmanaque from '../../../components/splash';
import SplashPartner from '../../../components/splash/achievement';

//Images
import logo from '../../../images/logo/almanaque.svg';
import iconGoogle from '../../../images/icons/onboarding/iconGoogle.svg';

const Container = styled.div`
  min-height: 100vh;
  background: #FFFEFC;
  height: -webkit-fill-available;
`;

const Img = styled.img`
  padding-top: 7.188rem;
  width: 11.8rem;
`;

const BtnDoubt = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.margin || 'auto'};
  padding-top: 5px;
  width: 100%;
  height: ${props => props.height || '34px'};
  max-width: 36px;
  border-radius: 50%;
  font: 900 1.5rem 'Nunito', sans-serif;
	box-shadow: ${props => props.boxShadow || '0 5px 0 #000000'};
	background: ${props => props.background || '#373737'};
  color: #FFD000;

  :disabled {
    background: ${props => props.backgroundDisabled};
    opacity: ${props => props.opacityDisabled || '.4'};
    cursor: initial;
  }
`;

const BoxHelp = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${props => props.openSpan && '100%'};
  max-width: 425px;
  background: ${props => props.openSpan && 'rgba(0,0,0,.3)'};
  transition: .1s;
  z-index: 2;
`;

const ContentHelp = styled.div`
  position: relative;
  top: 5.2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-top: 3.5rem;
  width: 93%;
  max-width: 420px;
  box-shadow: 0 5px 5px #999;
  border-radius: 22px 4px 20px 20px;
  background: #fff;

  &:after {
    content: "";
    position: absolute;
    top: -2.4rem; right: 0;
    border: 20px solid;
    border-color: transparent transparent #fff transparent;
  }
`;

const Paragraph = styled.p`
  color: #373737;
  font: 500 1rem 'Nunito', sans-serif;
`;

const Email = styled.h3`
  padding: 1.688rem 0 1.836rem 0;
  color: #373737;
  font: 900 1.2rem 'Nunito', sans-serif;
  word-break: break-word;

  @media (max-width: 400px) { font-size: 1rem; }
`;

const Close = styled.div`
  color: #373737;
  font: 800 2.1rem 'Nunito', sans-serif;
  transform: scale(1,.85);
  transition: .2s ease;
  cursor: pointer;

  &:hover { transform: scale(1.1,.95); }
`;

const Content = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F3F3F3;
`;

const ContentButton = styled.div`
  position: fixed;
  padding: 0 1rem 1.5rem 1rem;
  bottom: 0;
  width: 100%;
  max-width: 425px;
  min-height: auto;
`;

const mapDispatchToProps = dispatch => {
  return {
    signIn: (info) => dispatch(signIn(info)),
    getActionsBook: () => dispatch(getActionsBook())
  }
};

const Home = (props) => {
  const [screen, setScreen] = useState('almanaque');

  const handleClick = (type) => {
    props.history.push({ pathname: `/${type}` });
  };

  const handleNextScreen = () => {
    let timer;
    if (screen === 'almanaque') {
      timer = setTimeout(() => setScreen('partner'), 2000);
    }
    if (screen === 'partner') {
      timer = setTimeout(() => setScreen('home'), 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    if ('caches' in window) {
      caches.keys().then((names) => {
        console.log('clean cache')
        // Delete all the cache files
        names.forEach(name => {
          caches.delete(name);
        })
      });
    }
  }, [])

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      console.log("USER", user)
      const idToken = user.signInUserSession.idToken.jwtToken;
      props.signIn(user.attributes)
      localStorage.setItem('idToken', idToken)
      props.getActionsBook()
      props.history.push('/dashboard')
      console.log("User", user)
    }).catch(err => console.log("Error", err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function federatedeSignin(provider) {
    try {
      Auth.federatedSignIn({ provider })
    } catch (error) {
      console.log('error', error);
    }
  };

  const [openSpan, setOpenSpan] = useState(false);

  const renderSpan = () => (
    <ContentHelp openSpan={openSpan}>
      <Paragraph>Precisa de ajuda? Envie um e-mail para:</Paragraph>
      <Email>ajuda.almanaque.app@precisaser.org</Email>
      <Close onClick={() => setOpenSpan(false)}>x</Close>
    </ContentHelp>
  );

  const renderScreenHome = () => (
    <Content>
      <BoxHelp openSpan={openSpan}>
        <BtnDoubt onClick={() => setOpenSpan(openSpan ? false : true)}>?</BtnDoubt>
        {openSpan ? renderSpan() : null}
      </BoxHelp>
      <Img src={logo} alt='logo' />
      <ContentButton>
        <Button
          backgroundDisabled='#ccc'
          buttonBg='#FFFFFF'
          boxShadow='#EFE2E2 0px 7px 0px'
          handleClick={() => federatedeSignin("Google")}
          isIcon
          icon={iconGoogle}
        >
          continuar com o google
        </Button>
        <Button
          margin='1rem 0'
          handleClick={() => handleClick('cadastro')}
        >
          inscreva-se
        </Button>
        <Button
          buttonBg='#F3F3F3'
          boxShadow='#F3F3F3'
          handleClick={() => handleClick('login')}
        >
          entrar
        </Button>
      </ContentButton>
    </Content>
  )

  const renderScreen = () => {
    handleNextScreen();
    switch (screen) {
      case "almanaque":
        return <SplashAlmanaque />

      case "partner":
        return <SplashPartner />

      default:
        return renderScreenHome()
    }
  }

  return (
    <Container>
      {renderScreen()}
    </Container>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Home);
