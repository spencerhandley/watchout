// start slingin' some d3 here


var width = 960;
var height = 500;
var numEnemies = 20;
var radius = 10

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

var collisions = d3.selectAll("div.collisions span");

var player = svg.selectAll("circle.player")
   .data([[1,1]])
   .enter()
   .append("circle")
   .attr("cx", function(d) {
        return Math.floor((width) * Math.random());
   })
   .attr("cy", function(d) {
        return Math.floor((height) * Math.random());
   })
   .attr("r", radius)
   .style("fill", "red")
   .attr("class", "player");

svg.selectAll("circle.player")
.on("drag", function(){
});

var drag = d3.behavior.drag()
.on('drag', function() {
  movePlayer(d3.event.dx,d3.event.dy);
});
player.call(drag);

player.on('tick', function() {
  console.log('ticking');
});

var incrementCollision = _.throttle(function() {
  collisions.text(parseFloat(parseFloat(collisions.text()) + 1));
},500);

setInterval(function() {

  var pX = parseFloat(player.attr("cx"))
  var pY = parseFloat(player.attr("cy"))
  var nodes = svg.selectAll("circle.enemy")
  nodes.each(function(d, i){

    var nY = parseFloat(this.getAttribute("cy"))
    var nX = parseFloat(this.getAttribute("cx"))
    if(Math.abs(nX - pX) <= 2*radius
      && Math.abs(nY - pY) <= 2*radius) {
      incrementCollision();
    }
  })
  //  console.log(nodes[i].cx)
  //   var nY = nodes[i].attributes[1].value
  //   console.log(nX)

  // }
},100);

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
   .attr("r", radius)
   .attr("class", "enemy");


var movePlayer = function(dx, dy) {
  player
  .attr("cx", function(d){return parseFloat(player.attr("cx")) + dx })
  .attr("cy", function(d){return parseFloat(player.attr("cy")) + dy })
}

var update = function(){
  // var newCoords = randomCoords(numEnemies)
  //svg.selectAll("circle.enemy")
   enemies.transition()
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
