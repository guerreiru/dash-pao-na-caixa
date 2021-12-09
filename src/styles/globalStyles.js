import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --bg-white: #E5E5E5
  }
  
  html, body, #root {
    height: 100%;
    font-family: 'Oxygen', sans-serif;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  input, select,  textarea {
    font-family: 'Oxygen', sans-serif;
  }
`;
