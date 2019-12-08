import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {
  BlogComponent
} from './components/BlogComponent.jsx'

export default class App extends Component {

  render() {
    return ( < div > < BlogComponent / > < /div>);
  }
}

