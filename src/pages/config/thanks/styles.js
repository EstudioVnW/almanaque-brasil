import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100%;
  background: #F3F3F3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Subtitle = styled.p`
  color: #373737;
  font-size: 1.02em;
  line-height: 1.6;
  margin: 4rem auto 0;
  width: 90%;
`;

export const Content = styled.div`
  height: 100vh;
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const BoxImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  width: 50%;
  height: 5rem;

  @media (max-width: 320px) {
    width: 9rem;
  }
`;