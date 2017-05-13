import React from 'react';
import { Field } from 'redux-form';
import { map } from 'lodash';
import uuidV4 from 'uuid/v4';

export default class LinkedInputs extends React.Component {
  constructor(props) {
    super(props);

    this.values = [];
  }

  _nextOnMax(e) {
    const { input: { onChange } } = this.props;

    const input = e.currentTarget;
    const inputMaxLength = Number(input.getAttribute('maxlength'));
    const inputIndex = Number(input.getAttribute('data-index'));
    const inputValue = input.value;
    
    this.values[inputIndex] = inputValue;
    onChange(this.values.join('/'));

    if (inputValue.length === inputMaxLength && input.nextElementSibling) {
      input.nextElementSibling.focus();
    }
  }

  render() {
    const { fields } = this.props;

    return (
      <fieldset>
        <label>Date de naissance</label>
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
              onKeyUp={(e) => this._nextOnMax(e)}
              data-index={index}
            />
          )
        })}
      </fieldset>
    )
  }
}
