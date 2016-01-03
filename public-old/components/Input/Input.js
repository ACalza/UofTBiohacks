import React, {Component} from 'react'
import autobind from 'autobind-decorator'
import cx from 'classnames'
import _ from 'underscore'

// Components
import Icon from '../Icon'

// Styles
import './input.scss'

@autobind
export default class Input extends Component {

  /**
   * Construct Input component.
   * @param {object} props properties:
   * @prop  {string} value the value of the input
   * @prop  {bool} isValid validity of value according to validator(s)
   * @prop  {function} validator validator function
   * @prop  {string} emptyMessage
   * @prop  {string} type e.g. 'text'
   * @return  {React Component}
   */
  constructor(props) {
    super(props)
    var valid = (this.props.isValid && this.props.isValid()) || true

    this.state =  {
      valid: valid,
      empty: _.isEmpty(this.props.value),
      focus: false,
      value: null,
      iconsVisible: !this.props.validator,
      validator: this.props.validator,
      type: this.props.type
    }
  }

  /**
   * Handle input value change.
   * @param  {string} event the new input value
   * @description set value, empty in state.
   *              validateInput.
   *              props.onChanger(event)
   * @return {none}
   */
  handleChange(event) {
    this.setState({
      value: event.target.value,
      empty: _.isEmpty(event.target.value)
    })

    // call input's validation method
    if(this.props.validate) {
      this.validateInput(event.target.value)
    }

    // call onChange method on the parent component for updating it's state
    if(this.props.onChange) {
      this.props.onChange(event)
    }
  }

  /**
   * Validate input value with props.validate
   * @param  {string} value the input value
   * @description if valid, set valid:true, errorVisible:false in state, else
   *              valid:false, errorMessage or emptyMessage
   * @return {none}
   */
  validateInput(value) {
    // trigger custom validation method in the parent component
    if(this.props.validate && this.props.validate(value)){
      this.setState({
        valid: true,
        errorVisible: false
      })
    } else {
      this.setState({
        valid: false,
        errorMessage: !_.isEmpty(value) ? this.props.errorMessage : this.props.emptyMessage
      })
    }

  }

  /**
   * Get validity of input
   * @description if empty or not valid, set valid:false, errorVisible:true
   * @return {Boolean} this.state.valid
   */
  isValid() {
    if(this.props.validate) {
      if(_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
        this.setState({
          valid: false,
          errorVisible: true
        })
      }
    }

    return this.state.valid
  }

  // Focus
  handleFocus() {
    this.setState({
      focus: true,
      validatorVisible: true
    })
  }

  // Blur
  handleBlur() {
    this.setState({
      focus: false,
      validatorVisible: false
    })
  }

  hideError() {
    this.setState({
      // errorVisible: false,
      validatorVisible: false
    })
  }

  render() {
    var inputGroupClasses = cx({
      'input_group':     true,
      'input_valid':     this.state.valid,
      'input_error':     !this.state.valid,
      'input_empty':     this.state.empty,
      'input_hasValue':  !this.state.empty,
      'input_focused':   this.state.focus,
      'input_unfocused': !this.state.focus
    })

    return (
      <div className={inputGroupClasses}>

        <label className="input_label" htmlFor={this.props.text}>
          <span className="label_text">{this.props.text}</span>
        </label>

        <input
          {...this.props}
          placeholder={this.props.placeholder}
          className="input"
          id={this.props.text}
          defaultValue={this.props.defaultValue}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoComplete="off"
        />

        <div className="validationIcons">
          <i className="input_error_icon"> <Icon type="circle_error"/> </i>
          <i className="input_valid_icon"> <Icon type="circle_tick"/> </i>
        </div>
      </div>
    )
  }

  /**
   * update state.value iff new value exists and is not empty
   * @param  {object} newProps updated props
   * @description sets value, empty in state if above
   * @return {none}
   */
  // componentWillReceiveProps(newProps) {
  //   if(newProps.value) {
  //     if(!_.isUndefined(newProps.value) && newProps.value.length > 0) {
  //       if(this.props.validate) {
  //         this.validateInput(newProps.value)
  //       }
  //       this.setState({
  //         value: newProps.value,
  //         empty: _.isEmpty(newProps.value)
  //       })
  //     }
  //   }
  // }
}
