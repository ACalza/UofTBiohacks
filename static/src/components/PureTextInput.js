import React from 'react'
import PureComponent from 'react-pure-render/component'

import { FormsyText } from 'formsy-material-ui'

export default class PureTextInput extends PureComponent {
  render() {
    const {
      required,
      name,
      validations,
      validationError,
      hintText,
      floatingLabelText
    } = this.props

    return (
    <FormsyText style={{display: 'block'}}
      required={required}
      name={name}
      validations={validations}
      validationError={validationError}
      hintText={hintText}
      floatingLabelText={floatingLabelText}
    />)
  }
}
