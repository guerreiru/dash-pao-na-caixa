import styled from "styled-components";

export const Title = styled.h3`
  font-size: 2em;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  background-color: white;
  display: flex;
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