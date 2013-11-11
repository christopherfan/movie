$(document).ready(function() {

    console.log('ready');

	var w = 1000,
    h = 500,
    fill = d3.scale.category10(),
    nodes = [],
    foci = [{x: 250, y: 100}, {x: 750, y: 100}, {x: 250, y: 400}, {x:750,y:400}];

	
var vis = d3.select("main").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0)
    .size([w, h]);


	
force.on("tick", function(e) {

  // Push nodes toward their designated focus.
  var k = .1 * e.alpha;
  nodes.forEach(function(o, i) {
    o.y += (foci[o.id].y - o.y) * k;
    o.x += (foci[o.id].x - o.x) * k;
  });

  vis.selectAll("circle.node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});


   d3.json("test.json", function (error, graph) {   
	var sample_movies = graph.nodes;
	setInterval(function(){

		  
		  nodes.push({id: ~~(Math.random() * foci.length), "movie":sample_movies[0]});		  
		  force.start();
		  
		  vis.selectAll("circle.node")
			  .data(nodes)
			.enter().append("svg:circle")
			  .attr("class", "node")
			  .attr("cx", function(d) { return d.x; })
			  .attr("cy", function(d) { return d.y; })
			  .attr("r", 8)
			  .style("fill", function(d) { return fill(d.id); })
			  .style("stroke", function(d) { return d3.rgb(fill(d.id)).darker(2); })
			  .style("stroke-width", 1.5)
			  .call(force.drag);

		}, 500);
	});
});





