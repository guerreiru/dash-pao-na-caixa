import styled from "styled-components";

export const Container = styled.header`
  padding: 15px 20px;
  a {
    text-decoration: none;
  }
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.3);
  background-color: white;
`;

export const Content = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const BtnMenu = styled.div`
  margin-top: 6px;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const ListLinks = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  a {
    border-radius: 4px;
    color: #111;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      color: #777;
      cursor: pointer;
    }
  }

  a + a {
    margin-left: 10px;
  }
`;

export const SideMenu = styled.aside`
  background-color: white;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 10px;

  svg {
    align-self: flex-end;
  }

  a {
    border-radius: 4px;
    color: #111;
    text-decoration: none;
    font-weight: 600;
    margin-top: 5px;

    &:hover {
      color: #777;
      cursor: pointer;
    }
  }
`;
