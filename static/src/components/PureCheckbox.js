import React from 'react'
import PureComponent from 'react-pure-render/component'

export default class PureCheckBox extends PureComponent {
  render() {
    const {
      items,
      name
    } = this.props


    return (
      <div className={name}>
        {items.map( (item, i) =>
          <div className="subcheckbox">
            <input key={i} type="checkbox" name={name} value={item.value}></input>{item.text}
          </div>
        )}
      </div>
    )
  }
}
