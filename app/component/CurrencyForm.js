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
  }
  componentDidMount() {
    let $this = this;
    jQuery.getJSON(`https://api.fixer.io/latest?base=${this.state.from}`, function(data) {
      $this.setState({
        to: Object.keys(data.rates)[0],
        rateData: data
      });
    });
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
  render() {
    let $this = this;
    let amountInputStyle = {
      width: '130px'
    };
    let output = !this.state.rateData ? 0 : this.state.amount * this.state.rateData.rates[this.state.to];
    return (
      <form>
        <input type="number" style={amountInputStyle} min="0" value={this.state.amount} onChange={this.handleAmountChange} /> {this.state.from}<br />
        =<br />
        <input type="number" style={amountInputStyle} value={output} readOnly />
        <select onChange={this.handleToChange}>
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
      </form>
    );
  }
}

export default CurrencyForm;
