const CondominiumSchema = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Campo obrigatório!";
  } else if (values.name.length < 4) {
    errors.name = "Must be 4 characters or less";
  }

  if (!values.email) {
    errors.email = "Campo obrigatório!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.cell_phone) {
    errors.cell_phone = "Campo obrigatório!";
  } else if (values.cell_phone.length < 11) {
    errors.cell_phone = "Must be 11 characters or less";
  }

  if (!values.cpf) {
    errors.cpf = "Campo obrigatório!";
  } else if (values.cpf.length < 11) {
    errors.cpf = "Must be 11 characters or less";
  }

  if (!values.user) {
    errors.user = "Campo obrigatório!";
  } else if (values.user.length < 4) {
    errors.user = "Must be 4 characters or less";
  }

  if (!values.password) {
    errors.password = "Campo obrigatório!";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or less";
  }

  return errors;
};

export default CondominiumSchema;
