import React from 'react';
import { Field, reduxForm } from 'redux-form';

import LinkedInputs from './form-items/LinkedInputs';
import ToggleVisibilityInput from './form-items/ToggleVisibilityInput';


const required = value => (value ? undefined : 'Required');

const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined


const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const dateFields = [{
    type: 'text',
    maxlength: 4,
    placeholder: 'JJ',
    name: 'JJ'
  }, {
    maxlength: 5,
    placeholder: 'MM',
    name: 'MM'
  }];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name='firstName'
            component='input'
            type='text'
            placeholder='First Name'
          />
        </div>


        <Field name='date' 
          validate={[required]}
          component={LinkedInputs}
          props={{ fields: dateFields, hint: 'Remplir au format Jour/Mois/Annee' }}
        />

        <Field
          name='hello'
          component='input'
          type='text'
          placeholder='First Name'
        />

        <Field 
          name='foo'
          validate={required}
          component={ToggleVisibilityInput}
          placeholder='mot de passe'
          type='text'
          props={{ hint: <p>Mot de passe sécurisé</p> }}
        />

      </div>

      <div>
        <button type='submit' disabled={submitting}>Submit</button>
        <button type='button' disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple',
})(SimpleForm);
