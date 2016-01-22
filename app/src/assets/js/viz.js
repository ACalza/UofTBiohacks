import d3 from 'd3'
import PIXI from 'pixi.js'
import cardinalSpline from 'cardinal-spline-js'

/**
 * Voronoi graph as an illustration of dividing cells.
 * @param  {string} id the id of the dom element to append the renderer into
 * @return {none}    just calls render() at the end
 */
export default function(id) {
  // ==== PIXI renderer ====
  const W = window.innerWidth
  const H = window.innerHeight
  const renderer = new PIXI.autoDetectRenderer(W, H, { transparent: true, antialias: true })
  document.getElementById(id).appendChild(renderer.view)

  // PIXI stage and graphics child
  let stage = new PIXI.Container()
  let graphics = new PIXI.Graphics()
  stage.addChild(graphics)

  // ==== Nodes ====
  const numFactor = 10000
  const numNodes = Math.floor(W * H / numFactor)
  let nodes = Array(numNodes).fill().map( (_, i) => ({
    x: Math.floor(Math.random()*W),
    y: Math.floor(Math.random()*H),
    radius: 20 + Math.floor(Math.random()*10-5)
  }))

  // ==== Force ====
  const charge = -700
  let force = d3.layout.force()
    .nodes(nodes)
    // .links(links)
    .size([W, H])
    .linkStrength(0.1)
    .friction(0.9)
    .linkDistance(50)
    .charge(charge)
    .gravity(0.1)
    .theta(0.8)
    .alpha(0.1)
    // .start()

  force.start()
  for (var i = 0; i < nodes.length; ++i) {
    force.tick()
  }
  force.stop()

  // ==== Voronoi ====
  const voronoi = d3.geom.voronoi()
    .x(d => d.x)
    .y(d => d.y)

  const getControlPoints = (x0, y0, x1,y1 ,x2 ,y2 ,t) => {
    //  x0,y0,x1,y1 are the coordinates of the end (knot) pts of this segment
    //  x2,y2 is the next knot -- not connected here but needed to calculate p2
    //  p1 is the control point calculated here, from x1 back toward x0.
    //  p2 is the next control point, calculated here and returned to become the
    //  next segment's p1.
    //  t is the 'tension' which controls how far the control points spread.

    //  Scaling factors: distances from this knot to the previous and following knots.
    var d01 = Math.sqrt(Math.pow(x1-x0, 2) + Math.pow(y1-y0, 2))
    var d12 = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))

    var fa = t * d01 / (d01+d12)
    var fb = t - fa

    var p1x = x1 + fa * (x0-x2)
    var p1y = y1 + fa * (y0-y2)

    var p2x = x1 - fb * (x0-x2)
    var p2y = y1 - fb * (y0-y2)

    return [p1x, p1y, p2x, p2y]
  }

  // ==== Render ====
  const draw = () => {
    graphics.clear()

    const path = voronoi(nodes)
    graphics.lineStyle(2, 0xffffff, 1)
    // for (let i=0; i < path.length; i++) {
    //   graphics.moveTo(path[i][0][0], path[i][0][1])
    //
    //   for (let j=1; j < path[i].length; j++) {
    //     graphics.lineTo(path[i][j][0], path[i][j][1])
    //   }
    // }
    for (let i=0; i < path.length; i++) {
      graphics.moveTo(path[i][0][0], path[i][0][1])
      let j

      console.log(path[i])
      path[i].push(path[i][0])
      // path[i].push(path[i][1])

      for (j=1; j < path[i].length - 2; j++) {
        const xc = (path[i][j][0] + path[i][j+1][0]) / 2
        const yc = (path[i][j][1] + path[i][j+1][1]) / 2
        graphics.quadraticCurveTo(path[i][j][0], path[i][j][1], xc, yc)
      }

      graphics.quadraticCurveTo(path[i][j][0], path[i][j][1], path[i][j+1][0], path[i][j+1][1])
      // graphics.quadraticCurveTo(path[i][j+1][0], path[i][j+1][1], path[i][0][0], path[i][0][1])
    }

    // for (let i=0; i < path.length; i++) {
      // // Flatten [ [x0,y0], [x1,y1] ] to [x0, y0, y1, y2]
      // const pts = path[i].reduce( (a, b) => a.concat(b), [])
    //   const n = pts.length
    //   let cp = []
    //
    //   // Append and prepend knots and control points to close the curve
    //   pts.push(pts[0], pts[1], pts[2], pts[3])
    //   pts.unshift(pts[n-1])
    //   pts.unshift(pts[n-1])
    //
    //   const t = 0.3
    //   for (let j=0; j<n; j+=2) {
    //     cp = cp.concat(getControlPoints(pts[j],pts[j+1],pts[j+2],pts[j+3],pts[j+4],pts[j+5],t));
    //   }
    //
    //   for (let j=0; j<n+2; j+=2) {
    //     graphics.moveTo(pts[j], pts[j+1])
    //     graphics.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3])
    //   }
    // }

    // for (let i=0; i < path.length; i++) {
    //   // Flatten [ [x0,y0], [x1,y1] ] to [x0, y0, y1, y2]
    //   const pts = path[i].reduce( (a, b) => a.concat(b), [])
    //
    //   const outPts = cardinalSpline.getCurvePoints(pts, 0.5, 50, true)
    //
    //   graphics.moveTo(outPts[0], outPts[1])
    //   for (let j=0; j <= outPts.length; j += 2) {
    //     console.log('here')
    //     graphics.lineTo(outPts[j], outPts[j+1])
    //   }
    // }

    const links = voronoi.links(nodes)
    graphics.lineStyle(2, 0xffffff, 0.1)
    for (let i=0; i < links.length; i++) {
      const { source, target } = links[i]

      graphics.moveTo(source.x, source.y)
      graphics.lineTo(target.x, target.y)
    }


    graphics.lineStyle(0)
    // graphics.lineStyle(2, 0x578ed6, 1)
    graphics.beginFill(0xffffff, 0.5)
    for (let i=0; i < nodes.length; i++) {
      const { x, y, radius } = nodes[i]

      graphics.drawCircle(x, y, radius)
    }
  }

  const render = () => {
    draw()
    renderer.render(stage)
    requestAnimationFrame(render)
  }

  // render()
  draw()
  renderer.render(stage)
}
