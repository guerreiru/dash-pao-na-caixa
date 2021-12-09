import styled from "styled-components";
import bgLogin from "../../assets/bg-login.jpg";

export const Container = styled.div`
  background-image: url(${bgLogin});
  background-color: whitesmoke;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  padding-top: 20px;
`;

export const Content = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 35%;
  margin: 0 auto;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 90%;
  }

  button {
    align-self: center;
  }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  text-align: center;
`
