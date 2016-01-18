import d3 from 'd3'

export default function(id) {
  // ==== Canvas creation ====
  let canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  document.getElementById(id).appendChild(canvas)
  let W = canvas.width = canvas.offsetWidth
  let H = canvas.height = canvas.offsetHeight
  let ctx = canvas.getContext('2d')

  // ==== Nodes ====
  let nodes = []
  for (let i=0; i< 100; i++) {
    nodes.push({
      index: i,
      x: Math.floor(Math.random()*W),
      y: Math.floor(Math.random()*H),
      radius: 5
    })
  }

  // ==== Links ====
  let links = []
  for (let i=0; i<nodes.length; i++) {
    let j
    if (i+1 === nodes.length) {
      j = 0
    } else {
      j = i+1
    }
    links.push({
      source: i,
      target: j
    })
  }

  // ==== Force ====
  let force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([W, H])
    .linkStrength(0.1)
    .friction(0.9)
    .linkDistance(20)
    .charge(-30)
    .gravity(0.1)
    .theta(0.8)
    .alpha(0.1)
    .start()


  // ==== Render ====
  const clear = () => {
    ctx.clearRect(0,0,W,H)
  }

  const render = () => {
    clear()

    for (let i=0; i < links.length; i++) {
      let link = links[i]

      ctx.beginPath()
      ctx.moveTo(link.source.x, link.source.y)
      ctx.lineTo(link.target.x, link.target.y)
      ctx.lineWidth = 2
      ctx.strokeStyle = 'black'
      ctx.closePath()
      ctx.stroke()
    }

    for (let i=0; i < nodes.length; i++) {
      let x = nodes[i].x
      let y = nodes[i].y

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.arc(x, y, nodes[i].radius, 0, 2 * Math.PI)
      ctx.closePath()

      ctx.fillStyle = 'black'
      ctx.fill()
    }

    requestAnimationFrame(render)
  }

  render()
}
