const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = `Requis. C'est important un mot de passe`;
  }

  console.log('values', values);
  if (!values.courrier || !values.mail) {
    errors.buyer = `Requis. Ça aussi`;
  }

  return errors;
}

export default validate;