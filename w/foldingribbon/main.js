'use strict'

var ribbon, myCanvas, col1, col2,
    col1hex = "#700070", 
    col2hex = "#70FF70",
    tileSize = 20, 
    maxTiles = 100, 
    framesPerStep = 1,
    straigtWeight = 15,
    settings


function setup() {
  myCanvas = createCanvas(600, 600).elt;
  myCanvas.id = "myCanvas";
  if(windowHeight > windowWidth) {
  	myCanvas.style.width = "90vw"
  	myCanvas.style.height = "90vw"
    settings = QuickSettings.create(windowWidth*.5-100, windowHeight*0.8, "ribbon settings");

  } else {
		myCanvas.style.width = "95vh"
  	myCanvas.style.height = "95vh"
    settings = QuickSettings.create(0, 0, "ribbon settings");
  }

  noStroke()

  //mousePressed
  myCanvas.onclick = function() {
    var rx = snap(mouseX, ribbon.size)
    var ry = snap(mouseY, ribbon.size)
    ribbon = new Ribbon(rx, ry)
  }

  col1 = colorAlpha(col1hex, 150.0/255) 
  col2 = colorAlpha(col2hex, 150.0/255)
  ribbon = new Ribbon(width*.5,height*.5)


  initSettings();
}

function draw() {
  background(0)
  ribbon.show()
  
  if(ribbon.tiles.length>=maxTiles) ribbon.tiles.splice(0,1)
  
  if(frameCount%framesPerStep===0) {
    ribbon.next();
  }
}

function keyPressed(){
  ribbon.next();
}

function initSettings() {
  settings
    .addHTML("", "Adjust the ribbon's width, length, colors or foldiness here.").hideTitle("")
    .addRange("width", 5, 40, 30, 1, function(val){
      tileSize = val;
      ribbon = new Ribbon(snap(width/2,ribbon.size),snap(height/2,ribbon.size))
    })

    //TODO: add infinite ribbon with drawing on top of current canvas 
    .addRange("length", 20, 10000, 50, 1, function (val) {
      maxTiles = val;
      ribbon = new Ribbon(snap(width/2,ribbon.size),snap(height/2,ribbon.size))
    })
    .addColor("start color", col1hex, function(val){
      col1 = colorAlpha(val, 150.0/255);
      ribbon.col1 = col1;
    })
    .addColor("end color", col2hex, function(val){
      col2 = colorAlpha(val, 150.0/255);
      ribbon.col2 = col2;
    })
    .addRange("foldiness", 0.1, 1, 0.8, 0.08, function(val){
      straigtWeight = int((1 - val)*15) 
      ribbon.straigtWeight = straigtWeight 
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