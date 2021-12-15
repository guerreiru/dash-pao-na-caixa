import styled from "styled-components";

export const Container = styled.div`
  background-color: whitesmoke;
  height: 100%;
  padding-top: 20px;
`;

export const Content = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 0 auto;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);

  @media(max-width: 768px) {
    width: 90%;
  }
  
  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  div {
    margin-bottom: 8px;
  }
`;
