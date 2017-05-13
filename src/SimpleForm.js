import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';

const LinkedInputs = (props) => {
  let { input: { value, onChange }, fields } = props;

  const _nextOnMax = (e) => {
    const input = e.currentTarget;
    const inputMaxLength = Number(input.getAttribute('maxlength'));
    
    onChange(value + 1)
    if (input.value.length === inputMaxLength && input.nextElementSibling) {
      input.nextElementSibling.focus();
    }
  }

  console.log('fields', fields)


  return (
    <div>

      {map(fields, (field) => {
        return (
          <Field
            name='jj'
            component='input'
            type={field.type || 'text'}
            maxLength={field.maxlength}
            placeholder={field.placeholder}
            onKeyUp={_nextOnMax}
          />
        )
      })}
    </div>
  )
}

class MyCustomInput extends React.Component {
  render() {
    const { input: { value, onChange } } = this.props
    return (
      <div>
        <span>The current value is {value}.</span>
        <button type="button" onClick={() => onChange(value + 1)}>Inc</button>
        <button type="button" onClick={() => onChange(value - 1)}>Dec</button>
      </div>
    )
  }
}


const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const dateFields = [{
      type: 'text',
      maxlength: 4,
      placeholder: 'JJ'
    }, {
      maxlength: 5,
      placeholder: 'MM'
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


          <Field
            name='firstName'
            component='input'
            type='text'
            placeholder='First Name'
          />
 
        <Field name="myField" component={MyCustomInput}/>

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
