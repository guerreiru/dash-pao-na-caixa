import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--bg-white);
  height: 100%;

  .btnAddMobile {
    display: none;
  }

  @media (max-width: 568px) {
    .btnAddDesktop {
      display: none;
    }

    .btnAddMobile {
      display: inline-block;

      &:hover {
        color: #737373;
        transition: 0.2s ease-in;
      }
    }
  }
`;

export const Content = styled.div`
  margin: 0 20px;

  @media (max-width: 568px) {
    margin: 0 10px;
  }

  .btnEdit {
    color: #1565c0;
  }
  .btnDelete {
    color: #ff7a7a;
  }
`;

export const TableContainer = styled.div`
  margin: 20px 0;
  padding: 20px 30px;
  @media (max-width: 568px) {
    margin: 10px 0;
    padding: 20px;
  }
  background-color: white;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);

  a {
    text-transform: capitalize;
    text-decoration: none;
    color: #737373;
  }
`;

export const TableHeader = styled.div`
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
      text-align: center;
      font-size: 1.5em;
    }
    row-gap: 10px;
    justify-content: space-around;
  }
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 9px;
  border-radius: 4px;

  input {
    border: none;
    outline: none;
    padding: 0 8px;

    &::placeholder {
      color: #737373;
      font-size: 16px;
    }
  }
`;
