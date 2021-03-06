import React from "react";
import * as S from "./modalStyles";

import CloseBtn from "./closeModal";

// Elifas
import guideElifas from '../../images/elifas.svg';
import tipElifas from '../../images/elifas/tip.svg';
import okElifas from '../../images/elifas/ok.svg';
import Select from '../form/contentSelect';

export default function Modal({
  handleCloseTutorial,
  handleModalTip,
  handleClick,
  isResend,
  isTutorial,
  isWelcome,
  isScore,
  showThunk,
  resetProgress,
  isTip,
  title,
  subtitle,
  bottom,
  margin,
  padding,
  width,
  minHeight,
  isIcon,
  color,
  data,
  background,
  backgroundImg,
  isWrongAnswer,
  btnContent,
  buttonBg,
  elifasWidth,
  elifasBottom,
  elifas,
  noAbsolute,
  fontWeight,
  font,
  balloonColor,
  isError,
  btnWidth,
  btnHeight,
  repeat,
  isQuestionKinship,
  value,
  name,
  handleChange,
  isTermsAccepted,
  handleAceptTerms,
  attention,
}) {
  const renderElifas = () => {
    switch (elifas) {
      case 'guide':
        return <S.ImgElifas
          isWelcome
          elifasWidth={elifasWidth}
          elifasBottom={elifasBottom}
          src={guideElifas}
          alt="Personagem Elifas com mochila nas costas"
        />
      case 'ok':
        return <S.ImgElifas
          isTutorial={isTutorial}
          elifasWidth={elifasWidth}
          elifasBottom={elifasBottom}
          src={okElifas}
          alt="Personagem Elifas fazendo sinal de ok"
        />
      case 'tip':
        return <S.ImgElifas
          isWrongAnswer={isWrongAnswer}
          isTutorial={isTutorial}
          elifasWidth={elifasWidth}
          elifasBottom={elifasBottom}
          src={tipElifas}
          alt="Personagem Elifas apontando para o texto"
        />
      default:
        break
    }
  };

  return (
    <S.Container noAbsolute={noAbsolute} background={background}>
      <S.Content isTip={isTip}>
        <S.ContentInfo
          padding={padding}
          bottom={bottom}
          isTutorial={isTutorial}
          isResend={isResend}
          isTip={isTip}
          minHeight={minHeight}
          balloonColor={balloonColor}
          isError={isError}
          elifas={elifas}
        >
          {isWrongAnswer && <S.Figure backgroundImg={backgroundImg} repeat={repeat} />}

          {title && <S.Title>{title}</S.Title>}
          <S.TutorialBox>
            {subtitle &&
              <S.Subtitle
                color={color}
                fontWeight={fontWeight}
                font={font}
                isResend={isResend}
              >
                {subtitle}
              </S.Subtitle>
            }

            <S.Scroll isTutorial={isTutorial} isError={isError}>
              {isTutorial ? data[0].text.map(item =>
                <S.Text isTutorial={isTutorial}>{item}</S.Text>)
                : isWrongAnswer ?
                  <S.Text
                    margin={margin}
                    isIcon={isIcon}
                    isError={isError}
                    isTip={isTip}
                    isWrongAnswer={isWrongAnswer}
                    isWelcome={isWelcome}
                    isScore={isScore}
                    width={width}
                  >{data}</S.Text>
                  : data !== undefined && data.map(item =>
                    <S.Text
                      margin={margin}
                      isIcon={isIcon}
                      isError={isError}
                      isTip={isTip}
                      isWelcome={isWelcome}
                      isScore={isScore}
                      width={width}
                    >{item}</S.Text>)
              }
            </S.Scroll>
          </S.TutorialBox>

          {isQuestionKinship &&
            <Select
              value={value}
              name={name}
              handleChange={handleChange}
              isError={isError}
            />
          }

          {!isError && !isWrongAnswer && !btnContent &&
            <CloseBtn
              btnWidth={btnWidth}
              height={btnHeight}
              handleCloseTutorial={handleCloseTutorial}
              handleModalTip={handleModalTip}
              handleClick={handleClick}
              btnContent={btnContent}
              buttonBg={buttonBg}
              isWelcome={isWelcome}
              showThunk={showThunk}
              resetProgress={resetProgress}
            />
          }
          {btnContent &&
            <CloseBtn
              btnWidth={btnWidth}
              height={btnHeight}
              handleCloseTutorial={handleCloseTutorial}
              handleModalTip={handleModalTip}
              handleClick={handleClick}
              btnContent={btnContent}
              buttonBg={buttonBg}
              isWelcome={isWelcome}
              showThunk={showThunk}
              resetProgress={resetProgress}
            />
          }
        </S.ContentInfo>

        {!isResend && renderElifas()}
      </S.Content>
    </S.Container>
  );
}