// width and height of window
const WIDTH = window.innerWidth, 
      HEIGHT = window.innerHeight;


var numOfPoints = 100;    

var pointsX, pointsY;

window.onload = function(e) {

    // canvas setup
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // initial setup
    init(c);
    
    // main logic loop
    var loop = function() {
        update();
        render(c);
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas);
}

function init(c) {

  // initialize positioning of points
  pointsX = new Array(numOfPoints);
  pointsY = new Array(numOfPoints);

  for (var i = 0; i < numOfPoints; i++) {

    var distance = (i + 1) / numOfPoints * HEIGHT / 2;
    var angle = (i + 1) / numOfPoints * Math.PI * 2;

    var x = WIDTH / 2 + Math.cos(angle) * distance;
    var y = HEIGHT / 2 + Math.sin(angle) * distance;

    pointsX[i] = x;
    pointsY[i] = y;

  }

}

function update() {}

function render(c) {

  // draw points at their current positions
  for (var i = 0; i < numOfPoints; i++) {

    c.fillStyle = "white";
    c.beginPath();
    c.arc(pointsX[i], pointsY[i], 4, 0, 2 * Math.PI);
    c.fill();
    c.closePath();

  }

}