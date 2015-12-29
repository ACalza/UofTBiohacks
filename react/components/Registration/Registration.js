import React, {Component} from 'react'
import Input from '../Input'

// import User from '../../../src/models/user.js'
import User from '../../../reg-form.js'

import Icon from '../Icon'

class Registration extends Component {
  render() {
    return (
       <div>
        <Icon type="circle_error"/>
        {User.map(item =>
          <Input
            placeholder={item.val}
          />
        )}
       </div>
    )
  }
}

export default Registration
