import React, { Component } from 'react';
import './App.css';

import { Values } from 'redux-form-website-template';

import SimpleForm from './SimpleForm';

class App extends Component {
  handleSubmit(values) {
    console.log('values', values);
  }

  render() {
    return (
      <div className="App">
        <header className='App-header'/>
        <SimpleForm onSubmit={this.handleSubmit}/>
        <Values form="simple" />
      </div>
    );
  }
}

export default App;
