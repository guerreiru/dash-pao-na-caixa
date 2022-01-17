import styled from "styled-components";
import { darken, lighten } from "polished";

export const Container = styled.div`
  background-color: var(--bg-white);
  height: calc(100% - 61px);
  padding: 20px;
`;

export const Content = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  overflow-x: auto;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
`;

export const ActionsBtns = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  button {
    background: #1976d2;
    color: white;
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.06, "#1976d2")};
    }
    &:disabled {
      color: #777;
      background-color: #efefef;
      border-color: #efefef;
      border: 1px solid #999;
      cursor: not-allowed;
    }
  }
  select {
    height: 40px;
    padding: 0 8px;
    font-size: 16px;
    border-radius: 4px;
  }

  @media (max-width: 578px) {
    select {
      margin-bottom: 4px;
    }
  }
`

export const ProductTable = styled.table`
  width: 100%;
  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  img {
    height: 100px;
  }
  strong {
    color: #333;
    display: block;
  }
  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }
  button {
    background: none;
    border: 0;
    padding: 6px;
    svg {
      color: #1976d2;
      transition: color 0.2s;
    }
    &:hover {
      svg {
        color: ${darken(0.06, "#1976d2")};
      }
    }
    &:disabled {
      svg {
        color: ${lighten(0.25, "#1976d2")};
        cursor: not-allowed;
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;
  span {
    color: #999;
    font-weight: bold;
  }
  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;