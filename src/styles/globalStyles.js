import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --yellow: #F2C14B;
  }

  html, body, #root {
    height: 100%;
  }
  * {
    margin: 0;
    padding: 0;
  }
  button {
    cursor: pointer;
  }
`