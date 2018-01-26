![App ScreenShot](./app-screanshot.png?raw=true "React CryptoCompare Stream")
[Link](https://dmitry1007.github.io/react-cryptocompare-stream/)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project allows you to stream real time crypto currency data using [Socket.io](https://socket.io/) by pluging into CryptoCompare's web socket [api](https://www.cryptocompare.com/api/?javascript#-api-web-socket-). It also comes with [react-bootstrap-table](https://allenfang.github.io/react-bootstrap-table/index.html) so you could integrate any type of table you like. This project just comes with sortable colums and a search bar, but you can implement any one of the too many to list features that comes with this amazing library [Allen Fang](https://github.com/AllenFang) built!

I've included 17 of the largest cryptos by market cap in this implementation but you can simply add as many as CryptoCompare supports(they don't have streaming data for every crypto out there). Just add another string to the subscription Array in `/src/CryptoStreamer.js` in the same format as the rest.

Feel free to create a PR if you would like to update any part of the code :)


### Get Started
- `git clone git@github.com:Dmitry1007/react-cryptocompare-stream.git`
- `cd react-cryptocompare-stream`
- `npm install`
- `npm start`


##### Example Bitcoin JSON Object you get back from CryptoCompare

```json
{
  CHANGE24HOUR: "$ -40.53",
  CHANGE24HOURPCT: "-0.36%",
  FLAGS: "1",
  FROMSYMBOL: "BTC",
  HIGH24HOUR: 11758.37,
  HIGHHOUR: 11293.6,
  LASTMARKET: "bitFlyer",
  LASTTRADEID: "122990069",
  LASTUPDATE: 1516927087,
  LASTVOLUME: 0.01,
  LASTVOLUMETO: 112.5066,
  LOW24HOUR: 10896.79,
  LOWHOUR: 11159.81,
  MARKET: "CCCAGG",
  OPEN24HOUR: 11333.75,
  OPENHOUR: 11175.87,
  PRICE: 11293.22,
  TOSYMBOL: "USD",
  TYPE: "5",
  VOLUME24HOUR: 90524.22690170842,
  VOLUME24HOURTO: 1028918153.113864,
  VOLUMEHOUR: 1192.5534692810902,
  VOLUMEHOURTO: 13428562.363502882
}
```
