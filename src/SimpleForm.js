import React from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';

import LinkedInputs from './form-items/LinkedInputs';

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

        <Field name="date" component={LinkedInputs} props={{ fields: dateFields }}/>

        <FormSection name='birthdate'>
          <LinkedInputs fields={dateFields} />
        </FormSection>
        
        <Field
          name='hello'
          component='input'
          type='text'
          placeholder='First Name'
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
