const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = `Requis. C'est important un mot de passe`;
  }

  if (!values.courrier || !values.mail) {
    errors.buyer = `Requis. Ça aussi`;
  }

  if (!values.JJ) {
    errors.birthdate = `hello`
  }

  return errors;
}

export default validate;