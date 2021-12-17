import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;

  img {
    width: 100%;
  }

  h1 {
    text-align: center;
    font-size: 1.5rem;
  }
`;
