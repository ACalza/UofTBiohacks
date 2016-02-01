import React from 'react'
import PureComponent from 'react-pure-render/component'

import { Checkbox } from 'formsy-react-components'

export default class PureCheckBox extends PureComponent {
  render() {
    const { name, label, disabled } = this.props


    return (
    <div className="checkboxWrapper">
      <Checkbox {...this.props}></Checkbox>
    </div>
    )
  }
}
