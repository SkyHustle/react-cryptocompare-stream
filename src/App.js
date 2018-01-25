import React from 'react';
import logo from './logo.svg';
import './App.css';
import CryptoStreamer from './CryptoStreamer'

export default class App extends React.Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <CryptoStreamer />
        </div>
      );
    }
}
