'use strict'

var ribbon, myCanvas, col1, col2,
    col1hex = "#700070", 
    col2hex = "#70FF70",
    tileSize = 20, 
    maxTiles = 100, 
    framesPerStep = 1,
    straigtWeight = 5,
    infinite = true,
    bgcolor = "#000000",
    alpha = 150,
    settings


function setup() {
  myCanvas = createCanvas(600, 600).elt;
  myCanvas.id = "myCanvas";
  if(windowHeight > windowWidth) {
  	myCanvas.style.width = "95vw"
  	myCanvas.style.height = "95vw"
    settings = QuickSettings.create(windowWidth*.5-100, windowHeight*0.95, "ribbon settings");

  } else {
		myCanvas.style.width = "95vh"
  	myCanvas.style.height = "95vh"
    infinite = false;
    maxTiles = 250;
    settings = QuickSettings.create(0, 0, "ribbon settings");
  }

  initSettings();

  noStroke()

  //mousePressed
  myCanvas.onclick = function() {
    var rx = snap(mouseX, ribbon.size)
    var ry = snap(mouseY, ribbon.size)
    ribbon = new Ribbon(rx, ry)

    background(bgcolor)
  }

  col1 = colorAlpha(col1hex, 150.0/255) 
  col2 = colorAlpha(col2hex, 150.0/255)
  ribbon = new Ribbon(width*.5,height*.5)

  background(bgcolor)
}

function draw() {
  if(!infinite) {
    background(bgcolor)
    if(ribbon.tiles.length>=maxTiles) ribbon.tiles.splice(0,ribbon.tiles.length - maxTiles)
  }
  ribbon.show()
  
  if(frameCount%framesPerStep===0) {
    ribbon.next();
  }
}

function keyPressed(){
  ribbon.next();
}

function initSettings() {
  settings
    .addHTML("", "Adjust the ribbon's width, length, colors or foldiness here. Infinite mode recommended for mobile.").hideTitle("")
    .addRange("width", 5, 40, 30, 1, function(val){
      tileSize = val;
      ribbon = new Ribbon(snap(width/2,tileSize),snap(height/2,tileSize))
    })
    .addRange("length", 20, 1000, maxTiles, 1, function (val) {
      maxTiles = val;
    })
    .addBoolean("infinite", infinite, function(val) {
      infinite = val
    })
    .addRange("transparency", 0, 1, 150/250, 1/250, function(val) {
      alpha = 1 - val;
      col1 = colorAlpha(col1, alpha);
      ribbon.col1 = col1;
      col2 = colorAlpha(col2, alpha);
      ribbon.col2 = col2;
    })
    .addColor("start color", col1hex, function(val) {
      col1 = colorAlpha(val, alpha);
      ribbon.col1 = col1;
    })
    .addColor("end color", col2hex, function(val) {
      col2 = colorAlpha(val, alpha);
      ribbon.col2 = col2;
    })
    .addColor("background color", bgcolor, function(val) {
      bgcolor = val;
      background(bgcolor)
    })
    .addRange("foldiness", 0.1, 1, 0.7, 0.08, function(val) {
      straigtWeight = int((1 - val)*15) 
      ribbon.straigtWeight = straigtWeight 
    })
    .addButton("save", function() {
      save("foldingribbon"+random(1000)+".png")
    })
}

//helpers//
function snap(x, bin){
	return int(1.0*x/bin)*bin
}

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}