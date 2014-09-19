// start slingin' some d3 here


var width = 960,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "gameFrame")


var border = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", width)
    .style("stroke", "black")
    .style("fill", "none")
    .style("stroke-width", 2);

var initPositions = [[50,50],[80,80],[100,150]];

svg.selectAll("circle")
   .data(initPositions)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
        return d[0];
   })
   .attr("cy", function(d) {
        return d[1];
   })
   .attr("r", 4);

