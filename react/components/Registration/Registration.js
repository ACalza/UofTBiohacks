import React, {Component} from 'react'
import Input from '../Input'

// import User from '../../../src/models/user.js'
import User from '../../../reg-form.js'

class Registration extends Component {
  render() {
    return (
       <div>
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
