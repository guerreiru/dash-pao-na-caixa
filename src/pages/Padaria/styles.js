import styled from "styled-components";

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
    row-gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
