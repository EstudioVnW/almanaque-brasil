import React from "react";
import * as S from "./styles";

//Component
import Header from '../../../components/header/index';

//Images
import Gerdau from '../../../images/thanks/Gerdau.svg';
import Instituto from '../../../images/thanks/Instituto.svg';
import Holonomics from '../../../images/thanks/Holonomics.png';
import VaiNaWeb from '../../../images/thanks/VaiNaWeb.svg';

export default function Thanks() {
  return (
    <S.Container>
      <Header
        title='Agradecimentos'
      />
      <S.Content>
        <S.Subtitle>Agradecemos à comunidade de Miguel Burnier e a todas as pessoas que contribuíram para a realização do aplicativo Almanaque Miguel Burnier.</S.Subtitle>
        <S.BoxContainer>
          <S.BoxImage>
            <img src={Instituto} alt='Logo Instituto' />
          </S.BoxImage>
          <S.BoxImage>
            <img src={Holonomics} alt='Logo Holonomics' />
          </S.BoxImage>
          <S.BoxImage>
            <img src={Gerdau} alt='Logo Gerdau' />
          </S.BoxImage>
          <S.BoxImage>
            <img src={VaiNaWeb} alt='Logo Vai na Web' />
          </S.BoxImage>
        </S.BoxContainer>
      </S.Content>
    </S.Container>
  )
}