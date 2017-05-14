import React from 'react';
import { Field } from 'redux-form';
import { map } from 'lodash';
import uuidV4 from 'uuid/v4';
import classNames from 'classnames';


const MultipleRadioButtons = ({
      content,
      valid,
      name,
      meta:{touched, error, warning, invalid}
    }) => {

  const _renderInputItem = (item) => {
    const uuid = uuidV4();
    return (
      <label key={uuid} htmlFor={uuid}>
        <Field 
          name={item.name} 
          id={uuid} 
          component='input'
          type='radio'

          value={item.value} />
        {item.label}
      </label>
    )
  }

  const _renderChoices = (choice) => {
    return (
      <div key={uuidV4()}>
        <p>{choice.label}</p>

        { map(choice.items, (item, index) => {
          item.name = choice.name;
          return (
            _renderInputItem(item, index)
          )
        }) }
      </div>
    )
  }

  const hasError = touched && error;
  return (
    <fieldset className={classNames({error: hasError})}>
      { map(content.items, (item, index) => {
        return ( _renderChoices(item) )
      }) }

      {(touched) && ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </fieldset>
  )
}

export default MultipleRadioButtons;
