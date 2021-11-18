import styled from "styled-components";

export const Input = styled.input`
  margin-bottom: 8px;
  border: none;
  border-bottom: .5px solid gray;
  padding: 8px 8px 8px 0;

  &::placeholder {
    text-transform: capitalize;
  }

  &:focus-visible {
    outline: none;
  }
`