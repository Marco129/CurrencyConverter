import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import CurrencyForm from './component/CurrencyForm';

class App extends React.Component {
  render() {
    let style = {
      width: '220px',
      margin: '0 auto'
    };
    return (
      <div style={style}>
        <h3>Currency Converter</h3>
        <CurrencyForm />
        <p>
          <small>Foreign exchange rates by <a href="http://fixer.io" target="_blank">Fixer.io</a></small>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
