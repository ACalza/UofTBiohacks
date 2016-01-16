import React, { Component } from 'react'

import timeline from '../../assets/js/timeline'
import '../../styles/Timeline.scss'

export default class Timeline extends Component {

  render() {
    const timelineBlocks = []
    Object.keys(timeline).forEach( (time, i) => {
      let side
      i % 2 === 0 ? side = 'left' : side = 'right'

      const blockClass = `timeline-block ${side}`

      timelineBlocks.push(
        <div className={blockClass} key={i}>
          <span className="time">{time}</span>
          <span className="circle"></span>
          <h3 className="timeline-title">{timeline[time].title}</h3>
          <p>{timeline[time].content}</p>
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

    // return(
    //   <div className="container">
    //     <div className="Timeline">
    //       <div id="timeline1" className="timeline-block right">
    //         <span className="time">1:00 p.m.</span>
    //         <span className="circle"></span>
    //         <h3>Arrival and Registration</h3>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.</p>
    //       </div>
    //       <div id="timeline2" className="timeline-block left">
    //         <span className="time">2:00 p.m.</span>
    //         <span className="circle"></span>
    //         <h3>Opening Ceremony</h3>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.</p>
    //       </div>
    //     </div>
    //   </div>
    // )
  }
}
