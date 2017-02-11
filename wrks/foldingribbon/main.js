
'use strict'

var ribbon, 
    tileSize = 20, 
    maxTiles = 100, 
    framesPerStep = 1,
    straigtWeight = 5;

function setup() {
  const myCanvas = createCanvas(600, 600).elt;
  myCanvas.id = "myCanvas";
  if(windowHeight > windowWidth) {
  	myCanvas.style.width = "90vw"
  	myCanvas.style.height = "90vw"
  } else {
		myCanvas.style.width = "90vh"
  	myCanvas.style.height = "90vh"  	
  }


  noStroke()
  
  ribbon = new Ribbon(width*.5,height*.5)
  fill(255)
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

function mousePressed(){
  ribbon = new Ribbon(mouseX,mouseY)
}