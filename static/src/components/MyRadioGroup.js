import React from 'react'
import PureComponent from 'react-pure-render/component'
import {FormsyRadio, FormsyRadioGroup, FormsyCheckbox } from 'formsy-material-ui'
export default class MyRadioGroup extends PureComponent {
  render() {
    const { type, name, pairs } = this.props

    return (<div>
      <br /><br /><br />
      {pairs.map( (pair, i) =>
        <input key={i} type={type} name={name} value={pair.value}>{pair.text}</input>
      )}
    </div>)
  }
}
