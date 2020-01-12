// width and height of window
const WIDTH = window.innerWidth, 
      HEIGHT = window.innerHeight;


var numOfPoints = 100;    

var pointsX, pointsY;
var angle = 0;

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

  // initialize position arrays
  pointsX = new Array(numOfPoints);
  pointsY = new Array(numOfPoints);

}

function update() {

  // update angle
  angle += 0.1;
  if (angle > Math.PI * 2) {
    angle -= Math.PI * 2;
  }

  // update positions of points
  for (var i = 0; i < numOfPoints; i++) {

    var distance = (i + 1) / numOfPoints * HEIGHT / 2;

    var x = WIDTH / 2 + Math.cos(angle - (i + 1) / numOfPoints * Math.PI * 2) * distance;
    var y = HEIGHT / 2 + Math.sin(angle - (i + 1) / numOfPoints * Math.PI * 2) * distance;

    pointsX[i] = x;
    pointsY[i] = y;

  }

}

function render(c) {

  // draw points at their current positions
  for (var i = 0; i < numOfPoints; i++) {

    c.fillStyle = "white";
    c.beginPath();
    c.arc(pointsX[i], pointsY[i], 2, 0, 2 * Math.PI);
    c.fill();
    c.closePath();

  }

  // screen fade out effect
  c.fillStyle = "black";
  c.globalAlpha = 0.06;
  c.fillRect(0, 0, WIDTH, HEIGHT)
  c.globalAlpha = 1;

}