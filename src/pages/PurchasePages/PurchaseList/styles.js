import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--bg-white);
  height: 100%;
`;

export const Content = styled.div`
  margin: 20px;
  padding: 20px 30px;
  @media (max-width: 568px) {
    padding: 20px;
  }

  background-color: white;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
`;

export const ContentHeader = styled.div`
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
    h3 {
      flex: 1 0 100%;
      font-size: 1.5em;
      text-align: center;
    }
    row-gap: 10px;
    justify-content: space-around;
  }
`;

export const ResultHeader = styled.div`
  margin-top: 8px;
`;

export const ResidentTitle = styled.div`
  margin: 8px 0;
`;

export const ResumoTitle = styled.div`
  margin: 8px 0;
`;

export const FormGroup = styled.div`
  margin-bottom: 8px;
  label {
    display: block;
    margin-bottom: 8px;
  }

  input,
  select {
    height: 56px;
    padding: 0 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    width: 100%;
  }
`;
