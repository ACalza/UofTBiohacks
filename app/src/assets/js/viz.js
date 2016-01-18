import d3 from 'd3'

export default function(id) {

  // ==== Canvas creation ====
  let canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  document.getElementById(id).appendChild(canvas)
  let W = canvas.width = canvas.offsetWidth
  let H = canvas.height = canvas.offsetHeight
  let ctx = canvas.getContext('2d')

  const voronoi = d3.geom.voronoi()
    .x(d => d.x)
    .y(d => d.y)


  const numNodes = 100

  // ==== Nodes ====
  let nodes = Array(numNodes).fill().map( (_, i) => ({
    index: i,
    x: Math.floor(Math.random()*W),
    y: Math.floor(Math.random()*H),
    radius: 5
  }))

  // ==== Links ====
  let links = Array(numNodes).fill().map( (_, i) => {
    let j
    i+1 === numNodes ? j=0 : j=i+1

    return {
      source: i,
      target: j
    }
  })

  // ==== Force ====
  let force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([W, H])
    .linkStrength(0.1)
    .friction(0.9)
    .linkDistance(50)
    .charge(-30)
    .gravity(0.1)
    .theta(0.8)
    .alpha(0.1)
    .start()
    // .on('tick', render) // or requestAnimationFrame?

  function update(e) {
        //console.log(voronoi(vertices));
        //var path = path.data(voronoi(vertices))
        var path = voronoi(vertices);

        var link = voronoi.links(vertices);
  }


  // ==== Render ====
  const clear = () => {
    ctx.clearRect(0,0,W,H)
  }


  const render = () => {
    clear()
    let path = voronoi(nodes)

    for (let i=0; i < path.length; i++) {
      ctx.beginPath()
      ctx.moveTo(path[i][0][0], path[i][0][1])
      for (let j=1; j < path[i].length; j++) {
        ctx.lineTo(path[i][j][0], path[i][j][1])
      }
      ctx.closePath()

      ctx.strokeStyle = 'black'
      ctx.stroke()
    }

    // for (let i=0; i < links.length; i++) {
    //   let link = links[i]
    //
    //   ctx.beginPath()
    //   ctx.moveTo(link.source.x, link.source.y)
    //   ctx.lineTo(link.target.x, link.target.y)
    //   ctx.lineWidth = 2
    //   ctx.strokeStyle = 'black'
    //   ctx.closePath()
    //   ctx.stroke()
    // }
    //
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

    requestAnimationFrame(render)
  }

  render()
}
