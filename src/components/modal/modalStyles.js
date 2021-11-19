import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: ${props => props.background || '#ababab'};
  overflow: hidden;
  z-index: 5;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: ${props => !props.isTip && '5rem'};
  width: 100%;
  height: 100vh;
  max-width: 393px;
`;

export const ContentInfo = styled.div`
  position: relative;
  bottom: ${props => props.isTip && '18%'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: ${props => props.isTutorial ? '1rem 1.1rem' : '1.5rem 1rem 1rem'};
  width:  ${props => props.helpScreen ? '100%' : '91%'};
  min-height: ${props => props.isTip && '55vh'};
  letter-spacing: 1px;
  filter: ${props => !props.isError && 'drop-shadow(1px 4px 3px #999)'};
  border-radius: ${props => props.isTutorial ? '30px' : '20px'};
  background: ${props => props.balloonColor || '#fff'};

  img { cursor: pointer; }

  &:after {
    ${props => !props.elifas && 'display: none;'}
    position: absolute;
    content: '';
    left: ${props => props.isTip ? '42%' : '51%'};
    bottom: ${props => props.isTutorial ? '-9%' : '-12%'};
    display: ${props => props.isResend && 'none'};
    width: 50px;
    height: 70px;
    border: 0px solid;
    background-color: transparent;
    border-bottom-left-radius: 100%;
    box-shadow: -34px -34px 0px 30px #fff;
    transform: rotate(5deg);
    z-index: -1;
  }
`;

export const TutorialBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: 300;
  font-size: 1.1em;
  color: #373737;
`;

export const Subtitle = styled.h1`
  margin: .5rem 0 ${props => props.isTutorial ? '2.5rem' : '.7rem'};
  text-align: center;
  font-size: ${props => props.font || '1.25em'};
  line-height: ${props => !props.isResend && '1'};
  font-weight: ${props => props.fontWeight || '900'};
  color: ${props => props.color || '#373737'};
`;

export const Scroll = styled.ol`
  padding-left: ${props => props.isTutorial ? '3.3rem' : '0'};
  text-align: ${props => props.isError && 'center'};
  list-style: none;
  counter-reset: count;

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

export const Text = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  font-size: ${props => props.helpScreen ? '1.25rem' : '1rem'};
  width: ${props => (props.width && '100%') || (!props.isError && '92%')};
  margin: ${props => props.margin || '.5rem 0 1.5rem'};
  font-weight: ${props => props.helpScreen  && '900'};
  color: #373737;
  line-height: 1.45;
  letter-spacing: ${props => props.isTip || props.isScore ? '.5px' : '1.2px'};
  counter-increment: count;

  &:nth-child(2) {
    ${props => props.isScore && 'color: #373737; font: 900 2.5em Nunito,sans-serif; justify-content: center;'}

    &:after {
      ${props => props.isScore && "content: 'pts';"}
      margin-left: 6px;
      font-size: .6em;
      font-weight: 800;
    }
  }

  ${props => props.isTutorial && '&:last-child { margin-bottom: 1.2rem; }'};

  &:before {
    ${props => props.isTutorial && 'content: counter(count) "°";'}
    position: absolute;
    left: -2.9rem;
    font-size: 2.15em;
    font-weight: 900;
  }

  img {
    width: ${props => props.isIcon && '3.125rem'};
  }
  
  @media (max-width: 425px) {
    padding: ${props => props.padding && '1.5rem 0 .4rem 0 '};
    font-size: .96em;
  }
`;

export const ImgElifas = styled.img`
  position: absolute;
  right: ${props => props.isWelcome ? '-11' : '0'}%;
  bottom: 0;
  width: ${props => props.isWelcome ? '14' : '11'}rem;

  @media (max-width: 425px) {
    right: ${props => props.isWelcome ? '-14%' : '0'};
  }
  
  @media (max-height: 600px) {
    width: ${props => props.isWelcome ? '12' : '8.5'}rem;
  }
`;