const UserSchema = (values) => {
  const errors = {};

  if (!values.user) {
    errors.user = "Campo obrigatório!";
  } else if (values.user.length < 4) {
    errors.user = "O usuário deve conter pelo menos 4 caracteres";
  }

  if (!values.password) {
    errors.password = "Campo obrigatório!";
  } else if (values.password.length < 6) {
    errors.password = "A senha deve conter pelo menos 6 caracteres";
  } else if (
    !values.password.match(
      /(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,}$/
    )
  ) {
    errors.password = "A senha deve conter pelo menos um número";
  }

  return errors;
};

export default UserSchema;
