import React, { Component } from 'react';
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { NumericTextBox, MaskedTextBox } from '@progress/kendo-react-inputs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      number: 0,
    };
    this.etaRef = React.createRef(null);
    this.placeholder = '0000.0000';
  }

  componentDidMount() {
    if (this.etaRef && this.etaRef._input) {
      this.etaRef._input.addEventListener('keydown', this.handleKeyDown);
    }
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 46) {
      if (e.target && e.target.setSelectionRange) {
        const { selectionStart, selectionEnd } = e.target;
        if (selectionStart === selectionEnd) {
          const { value } = this.state;
          const valueArr = value.split('');
          if (
            selectionStart !== 2 &&
            selectionStart !== 5 &&
            selectionStart < 10
          ) {
            valueArr[e.target.selectionStart] = '0';
          }
          this.setState({ value: valueArr.join('') }, () => {
            e.target.setSelectionRange(selectionStart + 1, selectionEnd + 1);
          });
          e.preventDefault();
        }
      }
    }
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) || // 1-> 0
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      const start = e.target.selectionStart;
      // const end = e.target.selectionEnd;
      const { value } = this.state;
      const tempArr = value.split('');

      if (start === 2 || start === 5) {
        tempArr[start + 1] = e.key;
      } else {
        tempArr[start] = e.key;
      }
      const valueArr = tempArr.join('').split('/');
      // const isValid = DatePickerValidator.validateDatePicker(start, valueArr);

      // if (!isValid) {
      //   e.preventDefault();
      // }
    }
  };

  ChangeKilometers = (e) => {
    let value = e.value?.toString();
    value = value?.replace('.', '');
    console.log('value', e.value);
    if (value?.length <= 6) {
      // setVal(e.value);
    } else {
      console.log('over ');
      // alert('max length 5')
    }
    // setVal(e.value);
  };

  onTextBoxChange = (e) => {
    const { value } = e;
    const character = e.nativeEvent.data;
    console.log('value', value, 'character', character, e);
    const valueArr = value.split('.');
    const pointIdx = value.indexOf('.');
    const cursorIdx = e.selectionStart;
    console.log('cursorIdx', cursorIdx, 'pointIdx', pointIdx);
    // e.target.setSelectionRange(pointIdx + 1, pointIdx + 1);
    if (cursorIdx > pointIdx) {
      // console.log('after');
    } else {
      // console.log('before');
    }
    const [decimal, fraction] = valueArr;
    // const decimal = value.slice(0, cursorIdx);

    const newDecimal = [decimal, character].join('');
    const newStr = [newDecimal, fraction].join('.');
    console.log(
      'decimal',
      decimal,
      'newDecimal',
      newDecimal,
      'fraction',
      fraction,
      'newStr',
      newStr
    );
    if (e.nativeEvent.data === '.') {
      // const [decimal, fraction] = valueArr;
      // console.log('fraction', fraction);
    }

    this.setState({
      value: valueArr.join('.'),
      // value: newStr,
    });
  };

  onFocus = (e) => {
    e.target._input.setSelectionRange(0, 4);
  };
  render() {
    const { value, number } = this.state;
    return (
      <div>
        <h6>MaskedTextBox</h6>
        <MaskedTextBox
          ref={(inp) => {
            this.etaRef = inp;
          }}
          width={200}
          prompt="0"
          mask={this.placeholder}
          defaultValue={this.placeholder}
          value={value}
          onChange={this.onTextBoxChange}
          placeholder={this.placeholder}
          onFocus={this.onFocus}
        />
        <h6>2</h6>
        <NumericTextBox
          width={200}
          format="#.0####"
          value={number}
          onChange={this.ChangeKilometers}
        />
        <h6>3</h6>
        <NumericTextBox
          width={200}
          format="#.#####"
          value={number}
          onChange={this.ChangeKilometers}
        />
        <h6>4</h6>
        <NumericTextBox
          width={200}
          format={'n5'}
          value={number}
          onChange={this.ChangeKilometers}
        />
        <h6>5</h6>
        <NumericTextBox
          width={200}
          format={'#.00000'}
          value={number}
          onChange={this.ChangeKilometers}
        />
        <h6>6</h6>
        <NumericTextBox
          width={200}
          format={'0.00000'}
          value={number}
          onChange={this.ChangeKilometers}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('my-app'));
