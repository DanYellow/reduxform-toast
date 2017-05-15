import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'

import LinkedInputs from './form-items/LinkedInputs';
import ToggleVisibilityInput from './form-items/ToggleVisibilityInput';
import MultipleRadioButtons from './form-items/MultipleRadioButtons';


import validate from './validate';

let SimpleForm = (props) => {
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

    const subscriptionRadiosDatas = {
      title: 'Hello',
      items:[{
        label: 'Souscrire',
        name: 'subscription',
        items: [{
          value: 'oui',
          label: 'Oui',
        }, {
          value: 'non',
          label: 'Non'
        }]
      }]
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name='birthdate'
          component={LinkedInputs}
          props={{ fields: dateFields, hint: 'Remplir au format Jour/Mois/Annee' }}
        />

        <Field 
          name='password'
          component={ToggleVisibilityInput}
          placeholder='mot de passe'
          type='text'
          props={{ hint: <p>Mot de passe sécurisé</p> }}
        />

        <Field
          name='buyer'
          props={{ content: radiosDatas }}
          component={MultipleRadioButtons}
        />

        <Field
          name='buyer2'
          props={{ content: subscriptionRadiosDatas }}
          component={MultipleRadioButtons}
        />

        <Field name="favoriteColor" component="select">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
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

const onSubmitFail = (errors, dispatch, submitError, props) => {
  console.log(errors, dispatch, submitError, props);
}

SimpleForm = reduxForm({
  form: 'simple',
  validate,
  onSubmitFail: onSubmitFail
})(SimpleForm);


const mapStateToProps = (state) => {
  return {
    initialValues: {
      password: 'Some String',
    },
  }
}

SimpleForm = connect(mapStateToProps, null)(SimpleForm)


export default SimpleForm;
