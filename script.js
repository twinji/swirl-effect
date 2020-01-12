// width and height of window
const WIDTH = window.innerWidth, 
      HEIGHT = window.innerHeight;

// maximum number of points visible per frame
var numOfPoints = 100;    

// arrays for storing point radius and position data
var pointsX, pointsY, pointsRadius;

// current angle to draw points from
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

  // initialize point data arrays
  pointsX = new Array(numOfPoints);
  pointsY = new Array(numOfPoints);
  pointsRadius = new Array(numOfPoints);

}

function update() {

  // update angle
  angle += 0.08;
  if (angle > Math.PI * 2) {
    angle -= Math.PI * 2;
  }

  // update positions of points
  for (var i = 0; i < numOfPoints; i++) {

    // calculate distance from center of screen
    var distance = Math.pow(Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT), i / numOfPoints);

    // calculate coordintates
    var x = WIDTH / 2 + Math.cos(angle - (i + 1) / numOfPoints * Math.PI * 2) * distance;
    var y = HEIGHT / 2 + Math.sin(angle - (i + 1) / numOfPoints * Math.PI * 2) * distance;
    var radius = distance / 50;

    // assign calculated values
    pointsX[i] = x;
    pointsY[i] = y;
    pointsRadius[i] = radius;

  }
}

function render(c) {

  // draw points at their current positions
  for (var i = 0; i < numOfPoints; i++) {

    // only draw points that are visible in the window
    if (
      (pointsX[i] >= -pointsRadius[i] && pointsX[i] <= WIDTH + pointsRadius[i]) && 
      (pointsY[i] >= -pointsRadius[i] && pointsY[i] <= HEIGHT + pointsRadius[i])
    ) {

      // draw single point
      c.fillStyle = "white";
      c.beginPath();
      c.arc(pointsX[i], pointsY[i], pointsRadius[i], 0, 2 * Math.PI);
      c.fill();
      c.closePath();
  
    }
  }

  // screen fade out effect
  c.fillStyle = "black";
  c.globalAlpha = 0.06;
  c.fillRect(0, 0, WIDTH, HEIGHT)
  c.globalAlpha = 1;

}