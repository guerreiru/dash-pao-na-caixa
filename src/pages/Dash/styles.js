import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--bg-white);
  height: 100%;
`;

export const Content = styled.div`
  margin: 0 20px;
`;

export const TableContainer = styled.div`
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
