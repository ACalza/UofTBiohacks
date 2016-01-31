import React from 'react'
import PureComponent from 'react-pure-render/component'

import {FormsyRadio, FormsyRadioGroup } from 'formsy-material-ui'

export default class PureRadioGroup extends PureComponent {
  render() {
    const { type, name, pairs, disabled } = this.props

    return (
      <FormsyRadioGroup name={name} disabled={disabled}>
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
