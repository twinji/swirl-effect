// width and height of window
const WIDTH = window.innerWidth, 
      HEIGHT = window.innerHeight;

// maximum number of points visible per frame
var numOfPoints = 100;    

// arrays for storing point position data
var pointsX, pointsY;

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

  // initialize position arrays
  pointsX = new Array(numOfPoints);
  pointsY = new Array(numOfPoints);

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
    //var distance = (i + 1) / numOfPoints * Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT) / 2;
    var distance = Math.pow(Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT), i / numOfPoints);

    // calculate coordintates
    var x = WIDTH / 2 + Math.cos(angle - (i + 1) / numOfPoints * Math.PI * 2) * distance;
    var y = HEIGHT / 2 + Math.sin(angle - (i + 1) / numOfPoints * Math.PI * 2) * distance;

    // assign calculated values
    pointsX[i] = x;
    pointsY[i] = y;

  }
}

function render(c) {

  // draw points at their current positions
  for (var i = 0; i < numOfPoints; i++) {

    // only draw points that are visible in the window
    if ((pointsX[i] >= 0 && pointsX[i] <= WIDTH) && (pointsY[i] >= 0 && pointsY[i] <= HEIGHT)) {

      // calculate radius
      var radius = Math.pow(Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT), i / numOfPoints) / 50;

      // draw single point
      c.fillStyle = "white";
      c.beginPath();
      c.arc(pointsX[i], pointsY[i], radius, 0, 2 * Math.PI);
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