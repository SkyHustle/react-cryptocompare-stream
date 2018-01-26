import React from 'react';
import './react-bootstrap-table-all.min.css'
import './CryptoStreamer.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import CCC from './ccc-streamer-utilities';

// Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
// Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
// For aggregate quote updates use CCCAGG as market
import io from 'socket.io-client';
const socket = io.connect('https://streamer.cryptocompare.com/');

export default class CryptoStreamer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPrice: {},
        cryptos: [],
        subscription: [
          '5~CCCAGG~BTC~USD',
          '5~CCCAGG~ETH~USD',
          '5~CCCAGG~XRP~USD',
          '5~CCCAGG~BCH~USD',
          '5~CCCAGG~ADA~USD',
          '5~CCCAGG~XLM~USD',
          '5~CCCAGG~LTC~USD',
          '5~CCCAGG~NEO~USD',
          '5~CCCAGG~EOS~USD',
          '5~CCCAGG~XEM~USD',
          '5~CCCAGG~IOT~USD',
          '5~CCCAGG~DASH~USD',
          '5~CCCAGG~XMR~USD',
          '5~CCCAGG~TRX~USD',
          '5~CCCAGG~VEN~USD',
          '5~CCCAGG~BTG~USD',
          '5~CCCAGG~QTUM~USD'
        ]
      };
    }

    dataUnpack = (data) => {
      const currentPrice = this.state.currentPrice;
      const from = data.FROMSYMBOL;
      const to = data.TOSYMBOL;
      // const fsym = CCC.STATIC.CURRENCY.getSymbol(from);
      const tsym = CCC.STATIC.CURRENCY.getSymbol(to);
      const pair = from + to;

      // Do NOT use dot notionation for currentPrice[pair]
      if (!currentPrice.hasOwnProperty(pair)) {
        currentPrice[pair] = {};
      }

      for (const key in data) {
        currentPrice[pair][key] = data[key];
      }

      if (currentPrice[pair].LASTTRADEID) {
        currentPrice[pair].LASTTRADEID =
        parseInt(currentPrice[pair].LASTTRADEID, 10).toFixed(0);
      }

      currentPrice[pair].CHANGE24HOUR = CCC.convertValueToDisplay(
          tsym, (currentPrice[pair].PRICE - currentPrice[pair].OPEN24HOUR)
        );

      currentPrice[pair].CHANGE24HOURPCT = (
        (currentPrice[pair].PRICE - currentPrice[pair].OPEN24HOUR) /
        currentPrice[pair].OPEN24HOUR * 100).toFixed(2) + '%';

      // Check cryptos array for like objects and replace each crypto with updated version
      const indexOfCrypto = this.state.cryptos.indexOf(currentPrice[pair]);
      if (indexOfCrypto === -1) {
        this.state.cryptos.push(currentPrice[pair]);
      } else {
        this.state.cryptos[indexOfCrypto] = currentPrice[pair];
      }
      this.setState({ cryptos: this.state.cryptos });
    }

    handleStartStream = () => {
      socket.emit('SubAdd', { subs: this.state.subscription });
      const that = this;
      socket.on('m', (message) => {
        const messageType = message.substring(0, message.indexOf('~'));
        let res = {};
        if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
          res = CCC.CURRENT.unpack(message);
          that.dataUnpack(res);
        }
      });
    }

    handleStopStream = () => {
      socket.emit('SubRemove', { subs: this.state.subscription } );
    }

    handlePriceDirection = (price, cryptoObject) => {
      // 1 = Price Up, 2 = Price Down, 4 = Price Unchanged
      if (cryptoObject.FLAGS === '1') {
        return 'up';
      } else if (cryptoObject.FLAGS === '2') {
        return 'down';
      } else if (cryptoObject.FLAGS === '4') {
        return 'unchanged';
      }
    }

    handlePriceChange = (priceChange) => {
      // Check to see if price has a negative symbol '-'
      if (/[-]/.test(priceChange)) {
        return 'down';
      } else {
        return 'up';
      }
    }

    handleFormatNumber = (number) => {
      const n = parseFloat(number).toFixed(2);
      return '$ ' + Number(n).toLocaleString('en');
    }

    render() {
      return (
        <div className='col-md-offset-1 col-md-10'>
          <button type='button' onClick={ this.handleStartStream } className='btn btn-success'>Start Stream</button>
          <button type='button' onClick={ this.handleStopStream } className='btn btn-danger'>Stop Stream</button>

          <BootstrapTable ref='allTable' data={ this.state.cryptos } search>
            <TableHeaderColumn
              dataField='FROMSYMBOL'
              isKey dataSort>Symbol
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='PRICE'
              dataFormat={ this.handleFormatNumber }
              columnClassName={ this.handlePriceDirection }
              dataSort>Price
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='CHANGE24HOUR'
              columnClassName={ this.handlePriceChange }
              dataSort>Change 24h $
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='CHANGE24HOURPCT'
              columnClassName={ this.handlePriceChange }
              dataSort>Change 24h %
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='VOLUME24HOURTO'
              dataFormat={ this.handleFormatNumber }
              dataSort>Volume 24h $
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='HIGH24HOUR'
              dataFormat={ this.handleFormatNumber }
              dataSort>24h High
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='LASTMARKET'
              columnClassName={ 'exchange' }
              dataSort>Exchange
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
}
