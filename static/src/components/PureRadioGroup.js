import React from 'react'
import PureComponent from 'react-pure-render/component'

import {FormsyRadio, FormsyRadioGroup } from 'formsy-material-ui'

export default class MyRadioGroup extends PureComponent {
  render() {
    const { type, name, pairs } = this.props

    return (
      <FormsyRadioGroup name={name}>
        {pairs.map( (pair, i) =>
          <FormsyRadio
            key={i}
            label={pair.text}
            value={pair.value}
          />
        )}
      </FormsyRadioGroup>)
  }
}
