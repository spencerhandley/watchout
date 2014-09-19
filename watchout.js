// start slingin' some d3 here


var width = 960;
var height = 500;
var numEnemies = 20;

var randomCoords = function(n) {
  var coords = [];
  for (var i = 0; i < n; i++) {
    var x = Math.floor(width * Math.random());
    var y = Math.floor(height * Math.random());
    coords.push([x,y]);
  }
  return coords;
}

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "gameFrame");


var border = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", width)
    .style("stroke", "black")
    .style("fill", "none")
    .style("stroke-width", 2);

var coordStore = randomCoords(numEnemies);

var enemies = svg.selectAll("circle")
   .data(coordStore)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
        return d[0];
   })
   .attr("cy", function(d) {
        return d[1];
   })
   .attr("r", 10);


var update = function(dataset){
  // var newCoords = randomCoords(numEnemies)
  svg.selectAll("circle")
   .transition()
     .duration(2000)
     .attr("cx", function() {
      return Math.floor((width) * Math.random());
     })
     .attr("cy", function() {
      return Math.floor((height) * Math.random());
     })
     .ease()


  //create new coordinates

}

setInterval(function(){update(coordStore)}, 2000);
