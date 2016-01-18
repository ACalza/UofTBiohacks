import d3 from 'd3'

export default function(id) {

  // ==== Canvas creation ====
  let canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  document.getElementById(id).appendChild(canvas)
  let W = canvas.width = canvas.offsetWidth
  let H = canvas.height = canvas.offsetHeight
  let ctx = canvas.getContext('2d')






  // ==== Voronoi ====
  var w = window.innerWidth > 960 ? 960 : (window.innerWidth || 960),
      h = window.innerHeight > 500 ? 500 : (window.innerHeight || 500),
      radius = 5.25,
      links = [],
      simulate = true,
      zoomToAdd = true,
      color = d3.scale.quantize().domain([10000, 7250]).range(["#84a2e1","#4774d2","#2850a4","#193266"])

  var numVertices = (w*h) / 3500;
  var vertices = d3.range(numVertices).map(function(i) {
      var angle = radius * (i+10);
      //console.log({x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)})

      return {x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)};
  });

  var d3_geom_voronoi = d3.geom.voronoi().x(function(d) { return d.x; }).y(function(d) { return d.y; })
  var prevEventScale = 1;
  var zoom = d3.behavior.zoom().on("zoom", function(d,i) {
    if (zoomToAdd){
      if (d3.event.scale > prevEventScale) {
        angle = radius * vertices.length;
        vertices.push({x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)})
      } else if (vertices.length > 2 && d3.event.scale != prevEventScale) {
        vertices.pop();
      }
      force.nodes(vertices).start()
    } else {
      if (d3.event.scale > prevEventScale) {
        radius+= .01
      } else {
        radius -= .01
      }
      vertices.forEach(function(d, i) {
        angle = radius * (i+10);
        vertices[i] = {x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)};
      });
      force.nodes(vertices).start()
    }
    prevEventScale = d3.event.scale;
  });

  d3.select(window)
    .on("keydown", function() {
      // shift
      if(d3.event.keyCode == 16) {
        zoomToAdd = false
      }

      if(d3.event.keyCode == 83) {          
        simulate = !simulate
        if(simulate) {
          force.start()
        } else {
          force.stop()
        }
      }
    })
    .on("keyup", function() {
      zoomToAdd = true
    })





















  /*
  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              .on("click", svgClick)
              .call(zoom)
  */
  var force = d3.layout.force()
                .charge(-300)
                .size([w, h])
                .on("tick", update);

  force.nodes(vertices).start();












  /*
  var circle = svg.selectAll("circle");
  var path = svg.selectAll("path");
  var link = svg.selectAll("line");
  */


  function update(e) {
        //console.log(d3_geom_voronoi(vertices));
        //var path = path.data(d3_geom_voronoi(vertices))
        var path = d3_geom_voronoi(vertices);



        
        //console.log(path);
        /*
        path.enter().append("path")
            // drag node by dragging cell
            .call(d3.behavior.drag()
              .on("drag", function(d, i) {
                  vertices[i] = {x: vertices[i].x + d3.event.dx, y: vertices[i].y + d3.event.dy}
              })
            )
            .style("fill", function(d, i) { return color(0) })
            .on("click", pathClick)

        path.attr("d", function(d) { return "M" + d.join("L") + "Z"; })
            .style("fill", function(d, i) { return color(d3.geom.polygon(d).area()) })
        path.exit().remove();
        */

        var link = d3_geom_voronoi.links(vertices);

        /*
        circle = circle.data(vertices)
        circle.enter().append("circle")
              .attr("r", 1)
              .transition().duration(2000).attr("r", 15);
        circle.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
        circle.exit().transition().attr("r", 0).remove();

        link = link.data(d3_geom_voronoi.links(vertices))
        link.enter().append("line")
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })

        link.exit().remove()
        */
        if(!simulate) force.stop()
  }


  function pathClick(d){
    //console.log(this);
    console.log(d);
  }

  function svgClick(d){

    var mx = event.clientX;     
    var my = event.clientY; 

    vertices.pop();
    vertices.unshift({
                    index: vertices.length-1,
                    px: mx,
                    py: my,
                    weight: 0,
                    x: mx,
                    y: my

                  })
    force.start()
    zoomToAdd = true
          
  }


  /*
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
  */

  // ==== Render ====
  const clear = () => {
    ctx.clearRect(0,0,W,H)
  }


  const render = () => {
    clear()
    /*
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
    */
    requestAnimationFrame(render)
  }

  render()
}
