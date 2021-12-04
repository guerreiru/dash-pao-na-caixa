import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--bg-white);

  @media (min-width: 600px) {
    height: 100%;
  }
`;

export const Content = styled.div`
  margin: 0 20px;
`;

export const FormContainer = styled.div`
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


export const FormHeader = styled.div`
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

export const InputImage = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  height: 56px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 0;

  &:hover {
    outline: -webkit-focus-ring-color auto 1px;
  }
  input {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 0;
    opacity: 5;
    border: none;
  }
  label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    padding: 0.375rem 0.75rem;
    line-height: 2.5;
    color: #495057;
    background-color: #fff;
    border-radius: 0.25rem;
  }

  label::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: block;
    padding: 0.375rem 0.75rem;
    color: #495057;
    content: "Selecionar";
    background-color: #e9ecef;
    border-left: 1px solid #ced4da;
    border-radius: 0 0.25rem 0.25rem 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  text-align: center;
`

