import styled from "styled-components";
import bgError from "../../assets/error-401.png";

export const Container = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  background-image: url(${bgError});
  background-color: whitesmoke;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 90%;
`;
