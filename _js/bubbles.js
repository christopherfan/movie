
/**
	bubble function uses the force-layout example:https://github.com/mbostock/d3/wiki/Force-Layout
	It generates three clusters of node sets corresponding to list1, list2 and list3
**/

var nodes = []; // nodes array that is used by D3 force-layout 
function bubbles(list1, list2, list3) {

    nodes = []; // refresh the nodes array after a new function invocation
    var allMovies = {};
    var user1movies = [];
	for (i=0; i<list1.length; i++) {
	    user1movies.push(movies[list1[i]]);
	}

	var user2movies = [];
	for (i=0; i<list2.length; i++) {
	    user2movies.push(movies[list2[i]]);
	}

	var user3movies = [];
	for (i=0; i<list3.length; i++) {
	    user3movies.push(movies[list3[i]]);
	}

	allMovies.user1 = user1movies;
	allMovies.user2 = user2movies;
	allMovies.user3 = user3movies;

	console.log(allMovies);
	// Create the dimensions of the svg canvas
	var width = 1200,
	    height = 600,
	    trans=[0,0],
	    scale=1,
	    nodes = [],
	    i=0
	    fill = ["lightcoral", "goldenrod", "steelblue"]
	    // fill = ["blue", "orange", "red"] //d3.scale.category10(),
		// foci are the points around the svg canvas where the node clusters will gather around
		foci = [{ x: 300, y: 300 }, { x: 600, y: 300 }, { x: 900, y: 300 }, { x: 300, y: 200 }, { x: 600, y: 200 }, { x: 900, y: 200 }],
	    radiuScale = d3.scale.linear().domain([0, 500]).range([5,60]);

	// Create nodes by pushing node elements to the node array. ID field denotes which cluster set to associate the node. Movie field contains the data for that node
    (allMovies.user1).forEach(function (o, i) {
            nodes.push({id: 0, movie: o});
 	 });
 	 (allMovies.user2).forEach(function(o, i) {
 	         nodes.push({ id: 1, movie: o });
 	 });
 	 (allMovies.user3).forEach(function(o, i) {
 	         nodes.push({ id: 2, movie: o });
 	 
 	 });

	// Create the D3 force layout
 	 var force = d3.layout.force()
       .nodes(nodes)
       .size([width, height])
       .gravity(0)
       .charge(-120)
       .alpha(-0.7);
	
	// tick function is called to generate the dynamic effects 
	  force.on("tick", function(e) {
	      // Push nodes toward their designated focus.
	      var k = .1 * e.alpha;
	      nodes.forEach(function(o, i) {
	        o.y += (foci[o.id].y - o.y) * k;
	        o.x += (foci[o.id].x - o.x) * k;
	      });
	      
	      canvas.selectAll("circle.node")
	          .attr("cx", function(d) { return d.x; })
	          .attr("cy", function(d) { return d.y; });
	  });

	// Bind svg canvas to html
	  var canvas = d3.select("#visualization");
	  canvas.on("mousemove", mousemove);	 
	  canvas.attr("width", width).attr("height", height);

	  canvas.selectAll('circle').remove();
	  var cursor = canvas.append("circle")
		.attr("r", 30)
		.attr("transform", "translate(-100,-100)")
		.attr("class", "cursor");

		// Create the Nodes on the canvas
	  var node = canvas.selectAll(".node")
        .data(nodes)	  		      			
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .attr("r", function (d) { return radiuScale(d.movie.num_ratings); })
        .style("fill", function (d) {
            //console.log(d);
            return fill[d.id%3];
        })
    	// .style("stroke", function(d, i) { return d3.rgb(fill[d.id%3]).darker(4); })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", click)
        .call(force.drag);


		// Create Event handler to enable mouseover effect
	  	function mouseover(d) {
	  		$("#pop-up").fadeOut(100,function () {
	  		    // Popup content
	  		    $("#pop-up-title").html(d.movie.title);
	  		    $("#pop-img").html(d.movie.num_ratings);
	  		    $("#pop-desc").html(d.movie.imdb);

	  		    // Popup position is aligned next to the node the mouse is over
	  		    var popLeft = (d.x*scale)+trans[0]+90;
	  		    var popTop = (d.y*scale)+trans[1]+510;

	  		    $("#pop-up").css({"left":popLeft,"top":popTop});
	  		    $("#pop-up").fadeIn(200);
	  		});
	  	}

	  	function mouseout(d) {
	  	        $("#pop-up").fadeOut(500);
	  	}

	  	function click(d) {
	  		window.open(d.movie.imdb);
	  	}

	  	restart();
		
		//Create event handler to create mouse brush
	  	function mousemove() {
	  		cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
	  	}

		//Event handler to recreate the mouse brush whenever cursor moves
	  	function restart() {
	  		node = node.data(nodes);
	  		node.enter().insert("circle", ".cursor")
                .attr("class", "node")
                .attr("r", 5)
                .call(force.drag);
	  		force.start();
	  	}
}

