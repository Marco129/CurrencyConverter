import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery'

import OptionItem from './OptionItem';

class CurrencyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      from: 'HKD',
      to: undefined,
      rateData: undefined
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleCurrencySwitch = this.handleCurrencySwitch.bind(this);
  }
  componentDidMount() {
    let $this = this;
    jQuery.getJSON(`https://api.fixer.io/latest?base=${this.state.from}`, function(data) {
      $this.setState({
        to: !$this.state.to ? Object.keys(data.rates)[0] : $this.state.to,
        rateData: data
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.from !== prevState.from) {
      this.componentDidMount();
    }
  }
  handleAmountChange(e) {
    if (!this.state.rateData) return;
    this.setState({
      amount: !e.target.value ? 0 : e.target.value
    });
  }
  handleToChange(e) {
    this.setState({
      to: e.target.value.toUpperCase()
    });
  }
  handleCurrencySwitch() {
    if (!this.state.rateData) return;
    let exist = this.state.from;
    this.setState({
      from: this.state.to,
      to: exist,
      rateData: undefined
    });
  }
  render() {
    let $this = this;
    let amountInputStyle = {
      width: '130px'
    };
    let exchangeRateBoxStyle = {
      margin: 3,
      padding: 3,
      border: '1px solid #000'
    };
    let output = !this.state.rateData ? 0 : this.state.amount * this.state.rateData.rates[this.state.to];
    return (
      <form>
        <input type="number" style={amountInputStyle} min="0" value={this.state.amount} onChange={this.handleAmountChange} /> {this.state.from}<br />
        = <input type="button" value="<->" onClick={this.handleCurrencySwitch} /><br />
        <input type="number" style={amountInputStyle} value={output} readOnly />
        <select value={this.state.to} onChange={this.handleToChange}>
          {(function(option) {
            if (!$this.state.rateData) {
              option.push(<OptionItem key="0" />);
            } else {
              Object.keys($this.state.rateData.rates).forEach((key, i) => {
                option.push(<OptionItem key={i} value={key} text={key} />);
              });
            }
            return option;
          })([])}
        </select>
        {this.state.rateData &&
          <div style={exchangeRateBoxStyle}>
            1 {this.state.from} = {this.state.rateData.rates[this.state.to]} {this.state.to}
          </div>
        }
      </form>
    );
  }
}

export default CurrencyForm;
