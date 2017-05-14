import React from 'react';
import { Field } from 'redux-form';
import { cloneDeep } from 'lodash';

export default class ToggleVisibilityInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValueVisible: false,
    }
  }

  _toggleVisibility() {
    this.setState({
      isValueVisible: !this.state.isValueVisible,
    })
  }

  render() {
    const {
      input,
      meta: {touched, error, warning, active, visited, invalid},
      hint
    } = this.props;

    const inputType = (this.state.isValueVisible) ? 'text' : 'password';
    const clonedInputProps = cloneDeep(input);
    clonedInputProps.type = inputType;

    return (
      <fieldset>
        <label>Mot de passe</label>
          <div className='inputContainer'>
            <input {...clonedInputProps} placeholder={input.placeholder} type={clonedInputProps.type} />
            <button type='button' onClick={() => this._toggleVisibility()}>Toggle</button>
          </div>

        {active && 
          <div>{hint}</div>}

        {(touched || (!active && visited)) &&
                ((error && <span>{error}</span>) ||
                  (warning && <span>{warning}</span>))}
      </fieldset>
    )
  }
}
