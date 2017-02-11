
'use strict'

var ribbon, 
    tileSize = 20, 
    maxTiles = 100, 
    framesPerStep = 5,
    straigtWeight = 5;

function setup() {
  createCanvas(windowWidth-10, windowHeight-10);
  noStroke()
  
  ribbon = new Ribbon(300,300)
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

