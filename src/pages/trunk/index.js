import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


//Component
import Header from '../../components/header/headerYellow';
import TrunkInfoScreen from '../../components/thunk/trunkInfoScreen';
import Footer from '../../components/footer/footerMenu';

//Image
import arrow from '../../images/icons/arrow.svg';
import iconThunk from '../../images/icons/menu/selectedThunk.svg';

const mapStateToProps = state => ({
  thunk: state.thunk.data,
  userName: state.login.user.name
});

//Styled
const Container = styled.div`
  background: #F3F3F3;
  min-height: 100vh;
  overflow-x: hidden;
`;

const ContainerBox = styled.div`
  padding: 0 1rem 4rem;
`;

const ContentTitle = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 900;
  color: #373737;
`;

const IconModal = styled.img`
  transform: ${props => props.isOpen && 'rotate(90deg)'};
  transition: .2s ease;
`;

const ContentText = styled.div`
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  margin-right: .5rem;
  width: 44px;
  height: 44px;
  background: #BBBBBB;
  border-radius: 8px;
  object-fit: cover;

  >:last-child{
    margin-bottom: 1.0rem;
  }
`;

const Text = styled.h1`
  font-size: 1rem;
  font-weight: 900;
  color: #373737;
  text-align: center;
  padding-top: 4rem;
`;

const Trunk = (props) => {
  const [modal, setIsModal] = useState({ isModal: false, item: undefined });
  const [check, setCheck] = useState ("");
  const [infoModal, setIsInfoModal] = useState({ isModal: undefined, data: undefined });
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props?.thunk);
  }, [props?.thunk]);

  const handleModal = (item) => {
    setIsModal({ isModal: !modal.isModal, item: item });
    if(check !== item)
    setCheck(item)
    else setCheck("")
  }

  const handleInfoModal = (data) => {
    setIsInfoModal({ isModal: true, data: data });
  }

  const handleCloseModal = () => {
    setIsInfoModal({ isModal: false });
  }

  const renderContent = (title, key) => {
    return (
      <div key={key}>
        <ContentTitle onClick={() => handleModal(title)}>
          <Title>
            {title}
          </Title>
          <IconModal src={arrow} alt='Seta' isOpen={check === title} />
        </ContentTitle>
        {check === title &&
          data.filter((item) => item.category === title).map(i => (
            renderOptions(i)
          ))}
      </div>
    )
  }

  const renderOptions = (item, optionId) => (
    <ContentText key={optionId} onClick={() => handleInfoModal(item)}>
      <Image src={`data:image/jpeg;base64,${item.imageBase64}`} alt='Img' />
      <Text>{item.title}</Text>
    </ContentText>
  )

  const renderScreen = () => {
    let pairsList = [];

    data.forEach(element => {
      const pair = element.category;

      const includesItem = pairsList.includes(pair);

      if (!includesItem) {
        pairsList.push(pair);
      }
    });

    return pairsList.map((item, idx) => renderContent(item, idx))
  }
  
  return (
    <Container>
      <Header text='Baú' icon={iconThunk} />
      <ContainerBox>
        {!data.length
          ? <Text>Carregando</Text>
          : renderScreen()
        }
      </ContainerBox>
      <Footer screen='bau' />
      {infoModal.isModal && <TrunkInfoScreen itemData={infoModal.data} onClick={handleCloseModal} />}
    </Container>
  );
}

export default connect(
  mapStateToProps,
)(Trunk);
