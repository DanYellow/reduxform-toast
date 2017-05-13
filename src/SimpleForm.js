import React from 'react';
import { Field, reduxForm, FieldArray, Fields } from 'redux-form';

import LinkedInputs from './form-items/LinkedInputs';
import ToggleVisibilityInput from './form-items/ToggleVisibilityInput';
import MultipleRadioButtons from './form-items/MultipleRadioButtons';


const required = value => (value ? undefined : 'Required');

const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined



const renderFields = (fields) => {

  console.log('fields', fields);
  return (
    <div>
      <div className="input-row">
        <input {...fields.firstName.input} type="text"/>
        {fields.firstName.meta.touched && fields.firstName.meta.error && 
         <span className="error">{fields.firstName.meta.error}</span>}
      </div>
      <div className="input-row">
        <input {...fields.lastName.input} type="text"/>
        {fields.lastName.meta.touched && fields.lastName.meta.error && 
         <span className="error">{fields.lastName.meta.error}</span>}
      </div>
    </div>
  )
}


const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const dateFields = [{
    type: 'text',
    maxlength: 2,
    placeholder: 'JJ',
    name: 'JJ'
  }, {
    maxlength: 2,
    placeholder: 'MM',
    name: 'MM'
  }, {
    maxlength: 4,
    placeholder: 'YYYY',
    name: 'YYYY'
  }];

  const radiosDatas = {
    title: 'Hello',
    items:[{
      label: 'Par mail',
      name: 'mail',
      items: [{
        value: 'oui',
        label: 'Oui',
      }, {
        value: 'non',
        label: 'Non'
      }]
    }, {
      label: 'Par courrier',
      name: 'courrier',
      items: [{
        value: 'oui',
        label: 'Oui'
      }, {
        value: 'non',
        label: 'Non'
      }]
    }]
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>

        <Field name='date' 
          validate={[required]}
          component={LinkedInputs}
          props={{ fields: dateFields, hint: 'Remplir au format Jour/Mois/Annee' }}
        />

        <Field 
          name='foo'
          validate={required}
          component={ToggleVisibilityInput}
          placeholder='mot de passe'
          type='text'
          props={{ hint: <p>Mot de passe sécurisé</p> }}
        />

        <FieldArray
          name='buyer'
          validate={required}
          props={{ content: radiosDatas }}
          component={MultipleRadioButtons}
        />
      </div>

      <Fields 
      validate={required}
      anotherCustomProp="Some other information"
      names={[ 'firstName', 'lastName' ]} component={renderFields}/>

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
  fields: [ 'foo', 'password', 'date' ]
})(SimpleForm);
