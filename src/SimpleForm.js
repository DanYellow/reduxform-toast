import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';
import uuidV4 from 'uuid/v4';


const LinkedInputs = (props) => {
  let { input: { value, onChange }, fields } = props;
  let values = [];

  const _nextOnMax = (e) => {
    const input = e.currentTarget;
    const inputMaxLength = Number(input.getAttribute('maxlength'));
    const inputIndex = Number(input.getAttribute('data-index'));
    const inputValue = input.value;
    
    onChange(value + 1)

    values[inputIndex] = inputValue;
    if (inputValue.length === inputMaxLength && input.nextElementSibling) {
      input.nextElementSibling.focus();
    }
  }

  return (
    <div>
      {map(fields, (field, index) => {
        const key = field.name || uuidV4();
        return (
          <Field
            name={key}
            key={key}
            component='input'
            type={field.type || 'text'}
            maxLength={field.maxlength}
            placeholder={field.placeholder}
            onKeyUp={_nextOnMax}
            data-index={index}
          />
        )
      })}
    </div>
  )
}

// class LinkedInputs extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.values = [];
//   }

//   _nextOnMax(e) {
//     const input = e.currentTarget;
//     const inputMaxLength = Number(input.getAttribute('maxlength'));
//     const inputIndex = Number(input.getAttribute('data-index'));
//     const inputValue = input.value;
    
//     this.props.input.onChange(this.props.input.value + 1)

//     this.values[inputIndex] = inputValue;
//     console.log(this.values, inputIndex);
//     if (inputValue.length === inputMaxLength && input.nextElementSibling) {
//       input.nextElementSibling.focus();
//     }
//   }

//   render() {
//     let { input: { value, onChange }, fields } = this.props;

//     return (
//       <div>
//         {map(fields, (field, index) => {
//           console.log('index', index);
//           const key = field.name || uuidV4();
//           return (
//             <Field
//               name={key}
//               key={key}
//               component='input'
//               type={field.type || 'text'}
//               maxLength={field.maxlength}
//               placeholder={field.placeholder}
//               onKeyUp={(e) => this._nextOnMax(e)}
//               data-index={index}
//             />
//           )
//         })}
//       </div>
//     )
//   }
// }

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


          <Field
            name='hello'
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
