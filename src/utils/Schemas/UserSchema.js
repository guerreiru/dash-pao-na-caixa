const UserSchema = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Campo obrigatório!";
  } else if (values.name.length < 4) {
    errors.name = "O usuário deve conter pelo menos 4 caracteres";
  }

  if (!values.email) {
    errors.email = "Campo obrigatório!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "O email deve conter pelo menos 4 caracteres";
  }

  if (!values.cell_phone) {
    errors.cell_phone = "Campo obrigatório!";
  } else if (values.cell_phone.length < 11) {
    errors.cell_phone = "Must be 11 characters or less";
  }

  if (!values.cpf) {
    errors.cpf = "Campo obrigatório!";
  } else if (values.cpf.length < 11) {
    errors.cpf = "O usuário deve conter pelo menos 11 caracteres";
  }

  if (!values.apartment_number) {
    errors.apartment_number = "Campo obrigatório!";
  } else if (values.apartment_number.length < 2) {
    errors.apartment_number = "O apartamento deve conter pelo menos 1 caracter";
  }

  if (!values.user_name) {
    errors.user_name = "Campo obrigatório!";
  } else if (values.user_name.length < 4) {
    errors.user_name = "O usuário deve conter pelo menos 4 caracteres";
  }

  if (!values.password) {
    errors.password = "Campo obrigatório!";
  } else if (values.password.length < 6) {
    errors.password = "A senha deve conter pelo menos 6 caracteres";
  }

  return errors;
};

export default UserSchema;
