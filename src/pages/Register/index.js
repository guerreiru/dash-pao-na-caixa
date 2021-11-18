import React from "react";
import { Container, Content } from "./styles";
import Input from "../../components/Input";
import Header from "../../components/Header";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [cpf, setCpf] = React.useState("");

  return (
    <Container>
      <Header />
      <Content>
        <h3>Cadastro</h3>
        <Input value={name} id="name" setValue={setName} />
        <Input value={email} type="email" id="email" setValue={setEmail} />
        <Input value={phone} type="tel" id="cell_phone" setValue={setPhone} placeholder="Telefone" />
        <Input value={cpf} type="tel" id="cpf" setCpf={setPhone} />
        <button>Cadastrar-se</button>
      </Content>
    </Container>
  );
};

export default Register;
