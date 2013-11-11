$(document).ready(function() {

    console.log('ready');

	$('#search_box').submit(function() {
		$('#jQuery_send').text("jQuery sent: " + $('#search_text').val() );

		$.ajax(
		{
		type: "GET",
		url: "generate_json.py",
		data: "stuff_for_python=" + $('#search_text').val(),
		success: function(response)
		{	
			console.log(response);
			$('#python_response').text("Python returned: " + response);
		}
		});
		return false;
	});	
	
	
    var width = 1000,
        height = 500;    
    var color = d3.scale.category20();
    
    var force = d3.layout.force()
        .gravity(.1)
		.charge(-100)
        .linkDistance(30)
		.alpha(.01)
        .size([width, height]);

    var svg = d3.select("main").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("test.json", function (error, graph) {        
        var radiusScale = d3.scale.linear().domain([0, 5]).range([5, 10]);
        var linkScale = d3.scale.linear().domain([0,10]).range([3,12]);
        force
            .nodes(graph.nodes)
            .links(graph.links)
            .start();
		

		var link = svg.selectAll(".link")
			.data(graph.links)
			.enter().append("line")
			.attr("class", "link")
			.style("stroke-width", function (d) { return linkScale(d.value) });    
		
        var node = svg.selectAll("node")
            .data(graph.nodes)            
            .enter()            
            .append("circle")
            .attr("class", "node")
            .attr("r", function (d) {
                //console.log(d.rating, radiusScale(d.rating));                     
                return radiusScale(d.rating);
            })
            .style("fill", function (d) {
                //console.log("color", color(5));
                return '#00FF00';
            })
            .call(force.drag);


        
        node.append("title")
            .text(function (d) { return d.name; });

        node.append('text')
        .text(function (d, i) {
            return d.name;
        })
        .attr({
            "text-anchor": 'middle',
            'font-size': "20px",
            'fill':'red'
        });

        link.append("title")
            .text(function (d) {
               // console.log("distance weight",d.distance_weight);
                return d.distance_weight;
            });
                
        force.on("tick", function () {        
            node.attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
				

            link.attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        });

        //See the structure of the D3 Selection for Node
        //console.log(node);
        //console.log("grab", node[0][0].style.fill);
        //node[0][0].style.fill = 'FF0000';
        //console.log("grab again", node[0][0].style.fill);

        colorNodes(graph.links, node[0]);        
        
        link.on('click', function (d, i) {
            showDetails(d);
            drawBarChart(d);
        });
    });
});

function showDetails(edge) {

    var value = '<h1> Value = ' + edge.value + ' Distance =' + edge.distance_weight + '</h1>';
    $('#data_overlay').empty();
    $('#data_overlay').append(value);
}


function drawBarChart(edge) {

    var data = [{"label":"value", "value":edge.value},
                {"label":"distance", "value": edge.distance_weight}]

    console.log(data);

    var w = 300,
        h = 300,
        r = 100;
    var color = d3.scale.category10();

    data1 = [{ "label": "one", "value": 20 },
           { "label": "two", "value": 50 },
           { "label": "three", "value": 30 }];
    // create canvas

    var vis = d3.select("#data_overlay")
           .append("svg:svg")              //create the SVG element inside the <body>
           .data([data])                   //associate our data with the document
               .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
               .attr("height", h)
           .append("svg:g")                //make a group to hold our pie chart
               .attr("transform", "translate(" + 150 + "," + 150 + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function (d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
            .attr("fill", function (d, i) { return color(i); }) //set the color for each slice to be chosen from the color function defined above
            .style("fill", function(d,i) { return color(i); })
            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text")                                     //add a label to each slice
            .attr("transform", function (d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function (d, i) { return data[i].label + '<br>' + data[i].value; });        //get the label from our original data array


    

}


function colorNodes(links, nodes) {
    var color = d3.scale.category20();
    var nodeGroups = new Array;
    var arrayLength = nodes.length;
    var groupings = [{ 'nodes': [] }];
    var num_groups = 0;
    while (arrayLength--) nodeGroups.push(0); // instantiate 
    

    $.each(links, function (index, current_link) {
        //console.log(current_link);
        
        var source_node = current_link.source.index;
        var target_node = current_link.target.index;
               
        if (!nodeGroups[source_node] && !nodeGroups[target_node]) {
            //console.log(source_node, target_node);
            num_groups++;             
            nodeGroups[source_node] = nodeGroups[target_node] = num_groups;
            groupings.push({ 'nodes': [] });
            groupings[num_groups].nodes.push(source_node);
            groupings[num_groups].nodes.push(target_node);
           // console.log("creating new group",num_groups, groupings);       
        } else if (nodeGroups[source_node] && !nodeGroups[target_node]) {
            nodeGroups[target_node]= nodeGroups[source_node];
            groupings[nodeGroups[source_node]].nodes.push(target_node);
            //console.log("pushing", target_node, " to group", nodeGroups[source_node]);
            //console.log(groupings);
        } else if (!nodeGroups[source_node] && nodeGroups[target_node]) {
            nodeGroups[source_node] = nodeGroups[target_node];
            groupings[nodeGroups[target_node]].nodes.push(source_node);
            //console.log("pushing", source_node, " to group", nodeGroups[target_node]);
            //console.log(groupings);
        } else if (nodeGroups[source_node] && nodeGroups[target_node]) {
            var new_group_number = nodeGroups[source_node]
            var new_group = groupings[nodeGroups[source_node]].nodes.concat(groupings[nodeGroups[target_node]].nodes);
            //console.log("new group>>>>>>>>>>.", new_group);
            groupings[nodeGroups[source_node]].nodes = new_group;
           // console.log("combining", nodeGroups[source_node], " with", nodeGroups[target_node]);

            $.each(groupings[nodeGroups[target_node]].nodes, function (index, value) {
                nodeGroups[value] = new_group_number;
            });
           // console.log(groupings);
        }
    });

    //console.log(nodeGroups);
    var nodeSets = {};
    var temp ={};
    $.each(nodeGroups, function (index, value) {
        //console.log("Attach color", value, "to node", index);     
		setTimeout(function() {
        nodes[index].style.fill = color(value);}, 1000);
        var num_string = value.toString();
        
        if (nodeSets[num_string]==null) {
            temp = {};
            temp[num_string]= [index];
            $.extend(nodeSets, temp);            
        } else {            
            nodeSets[num_string].push(index);
        }
    });

    console.log(nodeSets);
    return nodeSets;
}