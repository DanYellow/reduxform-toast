import React from 'react';
import { Field } from 'redux-form';
import { map, compact, debounce } from 'lodash';

import classNames from 'classnames';

export default class LinkedInputs extends React.Component {
  constructor(props) {
    super(props);

    this.values = [];

    const TAB_KEY = 9;
    const SHIFT_KEY = 16;
    this.acceptableKeyCodes = [TAB_KEY, SHIFT_KEY];

    this.state = {
      showHint: false,
    }
  }

  _nextOnMax(e) {
    const code = e.keyCode || e.which;
    if (this.acceptableKeyCodes.indexOf(code) > -1) {
      return;
    }
    const { input: { onChange } } = this.props;

    const input = e.currentTarget;
    const inputMaxLength = Number(input.getAttribute('maxlength'));
    const inputIndex = Number(input.getAttribute('data-index'));
    const inputValue = input.value;
    
    this.values[inputIndex] = inputValue;
    // onChange(compact(this.values).join(''));
    onChange(compact(this.values).join('/'));

    if (inputValue.length === inputMaxLength && input.nextElementSibling) {
      input.nextElementSibling.focus();
    } else if (inputValue.length === 0 && input.previousElementSibling) {
      input.previousElementSibling.focus();
    }
  }

  _diplayHint() {
    this.setState({
      showHint: true,
    })
  }

  _hideHint() {
    this.setState({
      showHint: false,
    });

    // const debounced = debounce(() => {
    //   this.props.meta.touched = true;
    // }, 250);
    // debounced();
  }

  render() {
    const { fields, meta:{touched, error, warning, active, visited}, hint } = this.props;

    const hasError = (touched && error) || (!active && visited);

    return (
      <fieldset className={classNames({error: hasError})}>
        <label>Date de naissance</label>
        {map(fields, (field, index) => {
          return (
            <Field
              name={field.name}
              key={field.name}
              component='input'
              type={field.type || 'text'}
              maxLength={field.maxlength}
              placeholder={field.placeholder}
              onKeyUp={(e) => this._nextOnMax(e)}
              data-index={index}
              onFocus={() => this._diplayHint()}
              onBlur={() => this._hideHint()}
            />
          )
        })}

        {(this.state.showHint) &&
          <div>{hint}</div>}

        {(touched) && ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
      </fieldset>
    )
  }
}
