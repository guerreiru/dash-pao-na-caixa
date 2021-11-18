import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  flex-direction: column;
  background: rgb(242, 193, 75);
  background: linear-gradient(
    180deg,
    rgba(242, 193, 75, 1) 0%,
    rgba(213, 162, 39, 1) 35%,
    rgba(214, 158, 23, 1) 100%
  );
`;

export const Content = styled.div`
  background-color: white;
  margin: 0 auto;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 120px;
  padding: 40px 20px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  width: 30%;
  @media (max-width: 768px) {
    width: 80%;
  }

  button {
    padding: 10px 30px;
    border-radius: 4px;
    border: transparent;
    background-color: var(--yellow);
    font-weight: bold;
    color: #111;

    &:hover {
      filter: brightness(0.8);
      transition: 0.3s ease-in-out;
    }
  }
`;
