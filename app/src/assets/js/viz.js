
import d3 from 'd3'

export default function(id) {


    var w = document.getElementById("viz").clientWidth,
        h = document.getElementById("viz").clientHeight,
        radius = 5.25,
        links = [],
        simulate = true,
        zoomToAdd = true,
        // https://github.com/mbostock/d3/blob/master/lib/colorbrewer/colorbrewer.js#L105
        color = d3.scale.quantize().domain([10000, 7250]).range(["#84a2e1","#4774d2","#2850a4","#193266"])

    var numVertices = (w*h) / 3500;
    var vertices = d3.range(numVertices).map(function(i) {
        var angle = radius * (i+10);
        //console.log({x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)})

        return {x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)};
    });


    console.log(vertices)
  

  
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

        // s


        


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

    var svg = d3.select("#viz")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .on("click", svgClick)
            .call(zoom)

    var force = d3.layout.force()
            .charge(-300)
            .size([w, h])
            .on("tick", update);

    force.nodes(vertices).start();

    var circle = svg.selectAll("circle");
    var path = svg.selectAll("path");
    var link = svg.selectAll("line");

    function update(e) {
        path = path.data(d3_geom_voronoi(vertices))
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
            .style("stroke", "#EFEDF5")
            .style("stroke-width", "3px")


        path.exit().remove();

        circle = circle.data(vertices)
        circle.enter().append("circle")
              .attr("r", 1)
              .style("stroke", "#EFEDF5")
              .style("fill", "#EFEDF5")
              .style("pointer-events", "none")

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
            .style("pointer-events", "none")
            .style("stroke", "#EFEDF5")
            .style("stroke-width", "2px")
            .style("opacity", 0.02)

        link.exit().remove()

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


}













/*


import d3 from 'd3'
import PIXI from 'pixi.js'

export default function(id) {
  const W = window.innerWidth
  const H = window.innerHeight
  const renderer = new PIXI.autoDetectRenderer(W, H, { transparent: true, antialias: true })
  document.getElementById(id).appendChild(renderer.view)

<<<<<<< HEAD



    var w = document.getElementById("viz").clientWidth,
        h = document.getElementById("viz").clientHeight,
        radius = 5.25,
        links = [],
        simulate = true,
        zoomToAdd = true,
        // https://github.com/mbostock/d3/blob/master/lib/colorbrewer/colorbrewer.js#L105
        color = d3.scale.quantize().domain([10000, 7250]).range(["#84a2e1","#4774d2","#2850a4","#193266"])

    var numVertices = (w*h) / 3500;
    var vertices = d3.range(numVertices).map(function(i) {
        var angle = radius * (i+10);
        //console.log({x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)})

        return {x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)};
    });


    console.log(vertices)
  

  
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

        // s


        


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

    var svg = d3.select("#viz")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .on("click", svgClick)
            .call(zoom)

    var force = d3.layout.force()
            .charge(-300)
            .size([w, h])
            .on("tick", update);

    force.nodes(vertices).start();

    var circle = svg.selectAll("circle");
    var path = svg.selectAll("path");
    var link = svg.selectAll("line");

    function update(e) {
        path = path.data(d3_geom_voronoi(vertices))
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
            .style("stroke", "#EFEDF5")
            .style("stroke-width", "3px")


        path.exit().remove();

        circle = circle.data(vertices)
        circle.enter().append("circle")
              .attr("r", 1)
              .style("stroke", "#EFEDF5")
              .style("fill", "#EFEDF5")
              .style("pointer-events", "none")

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
            .style("pointer-events", "none")
            .style("stroke", "#EFEDF5")
            .style("stroke-width", "2px")
            .style("opacity", 0.02)

        link.exit().remove()

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




*/














  /*
  // ==== Canvas creation ====
  let canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  document.getElementById(id).appendChild(canvas)
  let W = canvas.width = canvas.offsetWidth
  let H = canvas.height = canvas.offsetHeight
  let ctx = canvas.getContext('2d')
=======
  let stage = new PIXI.Container()
  let graphics = new PIXI.Graphics()
  stage.addChild(graphics)
>>>>>>> 288b1b5d1b5f4acaceb1e10adbf14ff783bc4e07

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

  const render = () => {
    graphics.clear()

    let path = voronoi(nodes)

    for (let i=0; i < path.length; i++) {
      // graphics.beginFill(0x000000)
      graphics.lineStyle(2, 0x000000, 1)
      graphics.moveTo(path[i][0][0], path[i][0][1])

      for (let j=1; j < path[i].length; j++) {
        graphics.lineTo(path[i][j][0], path[i][j][1])
      }

      graphics.endFill()
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

    // Same as links array
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

    renderer.render(stage)
    requestAnimationFrame(render)
  }

  render()
  
}
*/
