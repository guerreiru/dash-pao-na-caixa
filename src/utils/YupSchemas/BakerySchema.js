const BakerySchema = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Campo obrigatório!";
  } else if (values.name.length < 4) {
    errors.name = "O nome deve conter pelo menos 4 caracteres";
  }

  if (!values.street_name) {
    errors.street_name = "Campo obrigatório!";
  } else if (values.street_name.length < 4) {
    errors.street_name = "A rua deve conter pelo menos 4 caracteres";
  }

  if (!values.number) {
    errors.number = "Campo obrigatório!";
  } else if (values.number.length < 1) {
    errors.number = "O número deve conter pelo menos 1 caracter";
  }

  if (!values.city) {
    errors.city = "Campo obrigatório!";
  } else if (values.city.length < 3) {
    errors.city = "A cidade deve conter pelo menos 3 caracteres";
  }

  if (!values.state) {
    errors.state = "Campo obrigatório!";
  } else if (values.state.length < 2) {
    errors.state = "o estado deve conter pelo menos 2 caracteres";
  }

  if (!values.zip_code) {
    errors.zip_code = "Campo obrigatório!";
  } else if (values.zip_code.length < 8) {
    errors.zip_code = "o cep deve conter pelo menos 8 caracteres";
  }

  if (!values.complement) {
    errors.complement = "Campo obrigatório!";
  } else if (values.complement.length < 2) {
    errors.complement = "o complemento deve conter pelo menos 2 caracteres";
  }

  return errors;
};

export default BakerySchema;
