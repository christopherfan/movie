function bubbles (list1, list2, list3) {
	var allMovies = {};
	var user1movies = []
	for (i=0; i<list1.length; i++) {
		user1movies.push(movies[i])
	}

	var user2movies = []
	for (i=0; i<list2.length; i++) {
		user2movies.push(movies[i])
	}

	var user3movies = []
	for (i=0; i<list3.length; i++) {
		user3movies.push(movies[i])
	}

	allMovies.user1 = user1movies
	allMovies.user2 = user2movies
	allMovies.user3 = user3movies

	var width = 1060,
	    height = 500,
	    trans=[0,0],
	    scale=1,
	    nodes = [],
	    i=0
	    fill = ["blue", "orange", "red"] //d3.scale.category10(),
	    foci = [{x: 250, y: 300}, {x: 550, y: 300}, {x: 850, y: 300}],
	    radiuScale = d3.scale.linear().domain([0, 500]).range([8,40]);


 	 (allMovies.user1).forEach(function(o, i) {
 	 	nodes.push({id: 0, movie: o});
 	 });
 	 (allMovies.user2).forEach(function(o, i) {
 	 	nodes.push({id: 1, movie: o});
 	 });
 	 (allMovies.user3).forEach(function(o, i) {
 	 	nodes.push({id: 2, movie: o});
 	 });

//d3.json("_js/movies.json", function(data) {
//	user1Set = data.user1;
	//console.log(data)
	  var force = d3.layout.force()
	    .nodes(nodes)
	    .size([width, height])
	    .gravity(0)
	    .charge(-150)
	    .alpha(-0.7)
	    .start();

	  force.on("tick", function(e) {

	      // Push nodes toward their designated focus.
	      var k = .1 * e.alpha;
	      nodes.forEach/(function(o, i) {
	        o.y += (foci[o.id].y - o.y) * k;
	        o.x += (foci[o.id].x - o.x) * k;
	      });

	      canvas.selectAll("circle.node")
	          .attr("cx", function(d) { return d.x; })
	          .attr("cy", function(d) { return d.y; });
	  });

	  var canvas = d3.select("#visualization");
	  
	  canvas.attr("width", width).attr("height", height)

	  /*setInterval(function(){ 
	  	if (i < data.lenght) {
	  			nodes.push(data[i]);
	  			i+=1;*/

	  		  	var node =canvas.selectAll(".node")
	  		      .data(nodes)
	  		      .enter()
	  		            .append("circle")
	  		            .attr("class", "node")
	  		            .attr("cx", function(d) { return d.x; })
	  		            .attr("cy", function(d) { return d.y; })
	  		            .attr("r", function(d) { return radiuScale(d.movie.num_ratings); })
	  		            .style("fill", function(d) { console.log(d); return fill[d.id]; })
	  		            .on("mouseover", mouseover)
	  		            .on("click", click)
	  		            .text()
	  		      
	  		   

	  		      function mouseover(d) {
	  		          $("#pop-up").fadeOut(100,function () {
	  		              // Popup content
	  		              $("#pop-up-title").html(d.movie.title);
	  		              $("#pop-img").html(d.movie.num_ratings);
	  		              $("#pop-desc").html(d.movie.imdb);

	  		              // Popup position
	  		              var popLeft = (d.x*scale)+trans[0]+70;//lE.cL[0] + 20;
	  		              var popTop = (d.y*scale)+trans[1]+420;//lE.cL[1] + 70;
	  		              console.log(d.x, d.y, popLeft, popTop);
	  		              $("#pop-up").css({"left":popLeft,"top":popTop});
	  		              $("#pop-up").fadeIn(100);
	  		          });
	  		      }

	  		    function click(d) {
	  				window.open(d.movie.imdb);
	  			}
	  	//}

	//});

}