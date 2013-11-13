var nodes = []

function bubbles(list1, list2, list3) {

    nodes = [];
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
	var width = 1200,
	    height = 600,
	    trans=[0,0],
	    scale=1,
	    nodes = [],
	    i=0
    // var color_scale = d3.scale.category20b();
	    fill = ["lightcoral", "plum", "steelblue"] //d3.scale.category10(),
	    // fill = [color_scale(2), color_scale(11),color_scale(20),]
    foci = [{ x: 300, y: 400 }, { x: 600, y: 400 }, { x: 900, y: 400 }, { x: 300, y: 300 }, { x: 600, y: 300 }, { x: 900, y: 300 }],
	    radiuScale = d3.scale.linear().domain([0, 500]).range([5,60]);


    (allMovies.user1).forEach(function (o, i) {
        if (o.num_ratings > 100) {
            nodes.push({ id: 3, movie: o });
        }else{
            nodes.push({id: 0, movie: o});
        }
 	 });
 	 (allMovies.user2).forEach(function(o, i) {
 	     if (o.num_ratings > 100) {
 	         nodes.push({ id: 4, movie: o });
 	     } else {
 	         nodes.push({ id: 1, movie: o });
 	     }
 	 });
 	 (allMovies.user3).forEach(function(o, i) {
 	     if (o.num_ratings > 100) {
 	         nodes.push({ id: 5, movie: o });
 	     } else {
 	         nodes.push({ id: 2, movie: o });
 	     }
 	 });
    nodes.push()

//d3.json("_js/movies.json", function(data) {
//	user1Set = data.user1;
	//console.log(data)
 	 var force = d3.layout.force()
       .nodes(nodes)
       .size([width, height])
       .gravity(.01)
       .charge(-160)
       .alpha(-0.7);
	    //.start();

	  force.on("tick", function(e) {

	      // Push nodes toward their designated focus.
	      var k = .1 * e.alpha;
	      nodes.forEach(function(o, i) {
	        o.y += (foci[o.id].y - o.y) * k;
	        o.x += (foci[o.id].x - o.x) * k;
	      });

	      canvas.selectAll(".node").attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
	      //canvas.selectAll("circle.node")
	      //    .attr("cx", function(d) { return d.x; })
	      //    .attr("cy", function(d) { return d.y; });
	  });

	  var canvas = d3.select("#visualization");
	  canvas.on("mousemove", mousemove);

	  
	  canvas.attr("width", width).attr("height", height);
	  canvas.selectAll('g').remove();
	  canvas.selectAll('circle').remove();
	  var cursor = canvas.append("circle")
      .attr("r", 30)
      .attr("transform", "translate(-100,-100)")
      .attr("class", "cursor");

	  var node = canvas.selectAll(".node")
        .data(nodes)

        .enter().append("g")
          .attr("class", "node").call(force.drag)
          .append("circle")
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .attr("r", function (d) { return radiuScale(d.movie.num_ratings); })
        .style("fill", function (d) {
            //console.log(d);
            return fill[d.id%3];
        })
		.style("stroke", function(d, i) { return d3.rgb(fill[d.id%3]).darker(4); })
        .on("mouseover", mouseover)
        .on("click", click);

	  canvas.selectAll(".node")
          .append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .text(function (d) { return d.movie.title })
          .attr("class", "label");


        //.enter()
        //      .append("circle")
        //      .attr("class", "node")
        //      .attr("cx", function (d) { return d.x; })
        //      .attr("cy", function (d) { return d.y; })
        //      .attr("r", function (d) { return radiuScale(d.movie.num_ratings); })
        //      .style("fill", function (d) {
        //          //console.log(d);
        //          return fill[d.id%3];
        //      })
		//	  .style("stroke", function(d, i) { return d3.rgb(fill[d.id%3]).darker(4); })
        //      .on("mouseover", mouseover)
        //      .on("mouseout", mouseout)
        //      .on("click", click)
        //      .call(force.drag);
	  		      	


	  	function mouseover(d) {
	  		$("#pop-up").fadeOut(100,function () {
	  		    // Popup content
	  		    $("#pop-up-title").html(d.movie.title);
	  		    $("#pop-img").html(d.movie.num_ratings);
	  		    $("#pop-desc").html(d.movie.imdb);

	  		    // Popup position is aligned next to the node the mouse is over
	  		    var popLeft = (d.x*scale)+trans[0]+70;
	  		    var popTop = (d.y*scale)+trans[1]+420;

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

	  	function mousemove() {
	  		cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
	  	}

	  	function restart() {

	  		node = node.data(nodes);

	  		node.enter().insert("circle", ".cursor")
                .attr("class", "node")
                .attr("r", 5)
                .call(force.drag);

	  		force.start();
	  	}
}

