import React from 'react'
import PureComponent from 'react-pure-render/component'

import { FormsySelect } from 'formsy-material-ui'
import { MenuItem } from 'material-ui/lib'

export default class PureTextInput extends PureComponent {
  render() {
    const {
      required,
      name,
      floatingLabelText,
      items,
      disabled
    } = this.props



    return (
    <FormsySelect required={required} name={name} floatingLabelText={floatingLabelText} disabled={disabled}>
      {items.map( (item, i) =>
        <MenuItem key={i} value={item.value} primaryText={item.text} />
      )}
    </FormsySelect>)
  }
}
