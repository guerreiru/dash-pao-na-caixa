import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 60px;
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, 0.3);
  a {
    text-decoration: none;
  }
  @media (max-width: 992px) {
    padding: 20px 0;
  }
  background-color: white;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;

  div {
    flex: 1;
    text-align: center;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    padding: 1px;

    div {
      flex: 1;
      justify-content: center;
      align-items: center;
      gap: 1px;
    }
  }
`;

export const ListLinks = styled.div`
  flex: 2;
  flex-wrap: wrap;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    padding: 4px 12px;
    border-radius: 4px;
    color: #111;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      background-color: #999;
      cursor: pointer;
    }
  }

  @media (max-width: 992px) {
    a {
      flex: 1 0 25%;
      text-align: center;
    }
  }
`;
