import React from 'react';
import ReactDOM from 'react-dom';

class OptionItem extends React.Component {
  render() {
    return (
      <option value={this.props.value}>{this.props.text}</option>
    );
  }
}

OptionItem.defaultProps = {
  value: '',
  text: ''
};

export default OptionItem;
