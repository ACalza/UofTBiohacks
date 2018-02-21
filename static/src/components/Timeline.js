import React, { Component } from 'react'

import timeline from '../assets/js/timeline.js'
import '../styles/Timeline.scss'

export default class Timeline extends Component {

  render() {
    const timelineBlocks = []
    timeline.forEach( ({ time }, i) => {
      let side
      i % 2 === 0 ? side = 'left' : side = 'right'

      const blockClass = `timeline-block ${side}`

      timelineBlocks.push(
        <div className={blockClass} key={i}>
          <span className="time">{time}</span>
          <span className="circle"><i className={timeline[i].icon}></i></span>
          <h3 className="timeline-title" dangerouslySetInnerHTML={{__html: timeline[i].title}}></h3>
          <div dangerouslySetInnerHTML={{__html: timeline[i].content}}></div>
        </div>
      )
    })

    return (
      <div>
        <div className="downTriangle" />
        <div className="container">
          <div className="Timeline">
            {timelineBlocks}
          </div>
        </div>
      </div>
    )
  }
}
