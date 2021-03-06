import React, { Component } from 'react';
import './styles.scss';
import Three from '../Three/Three';
import { $on } from '../../js/helpers';

console.log('window', Window);
console.log('window three', Window.THREE);

class App extends Component {

  constructor() {
    super();

    this.state = { loaded: false };

    $on(window, 'load', () => {
      this.setState({ loaded: true });
    });

  }

  render() {
    return (
      <main className={this.state.loaded ? 'loaded' : ''}>
        <Three />
      </main>
    );
  }
}

export default App;
