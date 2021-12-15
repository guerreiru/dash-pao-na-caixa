const SubscriptionPlanSchema = (values) => {
  const errors = {};

  if (!values.name) {
    errors.user = "Campo obrigatório!";
  } else if (values.user.length < 4) {
    errors.user = "O nome deve conter pelo menos 4 caracteres";
  }

  if (!values.price) {
    errors.price = "Campo obrigatório!";
  } else if (values.price.trim().length < 1) {
    errors.price = "O price deve conter pelo menos 1 caracter";
  }

  if (!values.deadline_orders_morning) {
    errors.deadline_orders_morning = "Campo obrigatório!";
  } else if (values.deadline_orders_morning.trim().length < 1) {
    errors.deadline_orders_morning =
      "O número deve conter pelo menos 1 caracter";
  }

  if (!values.deadline_orders_afternoon) {
    errors.deadline_orders_afternoon = "Campo obrigatório!";
  } else if (values.deadline_orders_afternoon.trim().length < 1) {
    errors.deadline_orders_afternoon =
      "O número deve conter pelo menos 1 caracter";
  }

  return errors;
};

export default SubscriptionPlanSchema;
