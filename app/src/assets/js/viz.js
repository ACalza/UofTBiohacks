import d3 from 'd3'
import PIXI from 'pixi.js'

export default function(id) {
  const W = window.innerWidth
  const H = window.innerHeight
  const renderer = new PIXI.autoDetectRenderer(W, H, { transparent: true, antialias: true })
  document.getElementById(id).appendChild(renderer.view)

  let stage = new PIXI.Container()
  let graphics = new PIXI.Graphics()
  stage.addChild(graphics)

  const voronoi = d3.geom.voronoi()
    .x(d => d.x)
    .y(d => d.y)

  const numFactor = 5000
  const numNodes = Math.floor(W * H / numFactor)

  // ==== Nodes ====
  let nodes = Array(numNodes).fill().map( (_, i) => ({
    x: Math.floor(Math.random()*W),
    y: Math.floor(Math.random()*H),
    radius: 5
  }))

  // ==== Force ====
  let force = d3.layout.force()
    .nodes(nodes)
    // .links(links)
    .size([W, H])
    .linkStrength(0.1)
    .friction(0.9)
    .linkDistance(50)
    .charge(-300)
    .gravity(0.1)
    .theta(0.8)
    .alpha(0.1)
    .start()

  const render = () => {
    graphics.clear()

    const path = voronoi(nodes)

    for (let i=0; i < path.length; i++) {
      // graphics.beginFill(0x000000)
      graphics.lineStyle(2, 0x000000, 1)
      graphics.moveTo(path[i][0][0], path[i][0][1])

      for (let j=1; j < path[i].length; j++) {
        graphics.lineTo(path[i][j][0], path[i][j][1])
      }

      graphics.endFill()
    }


    // let vlinks = voronoi.links(nodes)
    // for (let i=0; i < vlinks.length; i++) {
    //   const { source, target } = vlinks[i]
    //
    //   ctx.beginPath()
    //   ctx.moveTo(source.x, source.y)
    //   ctx.lineTo(target.x, target.y)
    //
    //   ctx.lineWidth = 2
    //   ctx.strokeStyle = 'red'
    //   ctx.closePath()
    //   ctx.stroke()
    // }

    // for (let i=0; i < nodes.length; i++) {
    //   let x = nodes[i].x
    //   let y = nodes[i].y
    //
    //   ctx.beginPath()
    //   ctx.moveTo(x, y)
    //   ctx.arc(x, y, nodes[i].radius, 0, 2 * Math.PI)
    //   ctx.closePath()
    //
    //   ctx.fillStyle = 'black'
    //   ctx.fill()
    // }

    renderer.render(stage)
    requestAnimationFrame(render)
  }

  render()
}
