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
    .style("fill", "black")
    .style("stroke-width", 2);

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

var collisions = d3.selectAll("div.collisions span");
var highScore = d3.selectAll("div.high span");
var currentScore = d3.selectAll("div.current span");

var incrementCollision = _.throttle(function() {
  collisions.text(parseFloat(parseFloat(collisions.text()) + 1));
},500);

var updateHighScore = function() {
  var high = parseInt(highScore.text());
  var current = parseInt(currentScore.text());
  if (current > high) {
    highScore.text(current);
  }
};

var resetCurrentScore = function() {
  currentScore.text("0");
};
var updateCurrentScore = function() {
  currentScore.text(parseInt(currentScore.text()) + 10);
}

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
      resetCurrentScore();
    }
  })
  updateCurrentScore();
  updateHighScore();


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
   .attr("class", "enemy")
   .style("fill", "white")



var movePlayer = function(dx, dy) {
  player
  .attr("cx", function(d){return parseFloat(player.attr("cx")) + dx })
  .attr("cy", function(d){return parseFloat(player.attr("cy")) + dy })
}
var colors = ["blue", "yellow", "red", "purple", "pink", "orange" ]
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
     .style("fill", colors[Math.floor(Math.random() * colors.length)])
     .ease("elastic")


  //create new coordinates

}

setInterval(function(){update(coordStore)}, 2000);
