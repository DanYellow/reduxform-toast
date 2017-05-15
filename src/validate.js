import moment from 'moment';

const validate = (values, foo) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = `Requis. C'est important un mot de passe`;
  }

  if (!values.courrier || !values.mail) {
    errors.buyer = `Requis ça aussi`;
  }

  if (!values.subscription) {
    errors.buyer2 = 'Requis également.'
  }

  if (!moment(values.birthdate,'D/M/YYYY', true).isValid()) {
    errors.birthdate = `Not a valid date`
  }


  return errors;
}

export default validate;