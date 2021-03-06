import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--bg-white);
  padding: 20px;
  padding-bottom: 4px;
  height: 100%;

  @media print {
    .noprint {
      display: none;
    }
  }

  input,
  select {
    background-color: white;
  }
`;

export const Content = styled.div`
  padding: 20px 30px;
  @media (max-width: 568px) {
    margin: 10px;
    padding: 15px;
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
  margin-top: 16px;
`;

export const ResidentTitle = styled.div`
  margin: 24px 0;
`;

export const ResumoTitle = styled.div`
  margin: 16px 0;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
  label {
    display: block;
    margin-bottom: 16px;
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
