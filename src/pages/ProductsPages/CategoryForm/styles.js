import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--bg-white);

  @media (min-width: 900px) {
    height: 100%;
  }
`;

export const Content = styled.div`
  margin: 0 20px;
`;

export const FormContainer = styled.div`
  padding: 20px 30px;
  background-color: white;
  margin: 20px 0;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);

  a {
    text-transform: capitalize;
    text-decoration: none;
    color: #737373;
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  h3 {
    flex: 1;
    font-size: 2em;
  }

  @media (max-width: 568px) {
    row-gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      flex: 1;
      font-size: 1.5em;
    }
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;
