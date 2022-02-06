import styled from "styled-components";

export const Container = styled.div`
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0px;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
  }

  .dropdown-content p {
    margin-bottom: 4px;
  }

  a {
    color: inherit;
  }

  p:hover, a:hover {
    color: #000;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`