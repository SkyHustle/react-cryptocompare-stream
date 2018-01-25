import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tabs, Tab } from 'react-bootstrap';
import CCC from './ccc-streamer-utilities';

// Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
// Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
// For aggregate quote updates use CCCAGG as market
import io from 'socket.io-client';
const socket = io.connect('https://streamer.cryptocompare.com/');

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

export default App;
