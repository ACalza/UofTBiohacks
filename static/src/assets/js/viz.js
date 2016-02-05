import d3 from 'd3'

/**
 * Voronoi graph as an illustration of dividing cells.
 * @param  {string} id the id of the dom element to append the renderer into
 * @return {none}    just calls render() at the end
 */
export default function(id) {
  // Create, append, get canvas context
  const canvas = document.createElement('canvas')
  const W = canvas.width = window.innerWidth
  const H = canvas.height = window.innerHeight
  document.getElementById(id).appendChild(canvas)
  const ctx = canvas.getContext('2d')

  // Visualization state
  let started = false

  // ==== Nodes ====
  const numFactor = 10000
  const numNodes = Math.floor(W * H / numFactor)

  const genNodes = (num) => {
    let nodes = new Array(num)
    for (let i=0; i < num; i++) {
      nodes[i] = {
        x: Math.floor(Math.random()*W),
        y: Math.floor(Math.random()*H),
        radius: 20 + Math.floor(Math.random()*10-5)
      }
    }

    return nodes
  }

  let nodes = genNodes(numNodes)

  // Events
  const onMouseMove = (e) => {
    nodes[0].x = e.clientX
    nodes[0].y = e.clientY
    force.nodes(nodes)
  }

  const onClick = (e) => {
    if (!started) {
      started = true
      nodes = genNodes(numNodes)
      force.nodes(nodes).start()
      nodes[0].x = e.clientX
      nodes[0].y = e.clientY
      render()
      
      canvas.addEventListener('mousemove', onMouseMove, false)
      document.getElementById('splashLogo').addEventListener('mousemove', onMouseMove, false)
      document.getElementById('splashTitle').addEventListener('mousemove', onMouseMove, false)
    } else {
      started = false
      document.getElementById('splashLogo').addEventListener('mousemove', onMouseMove, false)
      document.getElementById('splashTitle').addEventListener('mousemove', onMouseMove, false)
    }
  }
  canvas.addEventListener('click', onClick, false)
  document.getElementById('splashLogo').addEventListener('click', onClick, false)
  document.getElementById('splashTitle').addEventListener('click', onClick, false)

  // ==== Force ====
  const charge = -700
  let force = d3.layout.force()
    .nodes(nodes)
    .size([W, H])
    .linkStrength(0.1)
    .friction(0.9)
    .linkDistance(50)
    .charge(charge)
    .gravity(0.1)
    .theta(0.8)
    .alpha(0.1)

  force.start()
  for (var i = 0; i < nodes.length; ++i) {
    force.tick()
  }
  force.stop()

  // ==== Voronoi ====
  const voronoi = d3.geom.voronoi()
    .x(d => d.x)
    .y(d => d.y)

  // ==== Render ====
  const draw = () => {
    clear()

    const path = voronoi(nodes)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    for (let i=0; i < path.length; i++) {
      ctx.beginPath()
      const p = path[i]

      // Midpoint between first and last points
      const cX = (p[0][0] + p[p.length-1][0]) / 2
      const cY = (p[0][1] + p[p.length-1][1]) / 2
      ctx.moveTo(cX, cY)

      // Generate a midpoint between p0-p1, p1-p2, pn-pm,
      // until pm is the last point
      // draw quadratic curve using pj as the control and
      // the midpoint as the endpoint
      for (let j=0; j < p.length - 1; j++) {
        const mpX = (p[j][0] + p[j+1][0]) / 2
        const mpY = (p[j][1] + p[j+1][1]) / 2

        ctx.quadraticCurveTo(p[j][0], p[j][1], mpX, mpY)
      }

      // Complete the shape with curve from midpoint of pn-pm,
      // using pm (last point) as control, to cX,cY
      ctx.quadraticCurveTo(p[p.length-1][0], p[p.length-1][1], cX, cY)

      ctx.closePath()
      ctx.stroke()
    }

    const links = voronoi.links(nodes)
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
    for (let i=0; i < links.length; i++) {
      const { source, target } = links[i]

      ctx.beginPath(0)

      ctx.moveTo(source.x, source.y)
      ctx.lineTo(target.x, target.y)

      ctx.closePath()
      ctx.stroke()
    }


    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    for (let i=0; i < nodes.length; i++) {
      const { x, y, radius } = nodes[i]

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI*2)
      ctx.closePath()

      ctx.fill()
    }
  }

  const clear = () => {
    ctx.clearRect(0,0,W,H)
  }

  const render = () => {
    clear()
    draw()

    if (started) {
      requestAnimationFrame(render)
    }
  }

  // Initially one draw one frame, post full force simulation
  draw()
}
