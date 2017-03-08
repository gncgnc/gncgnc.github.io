'use strict'

var img, colors = [];

function preload() {
  img = loadImage("http://unsplash.it/256?random")
  //image=1049")
  //image=913")
}


function setup() {
  var myCanvas = createCanvas(600,600).elt;
  myCanvas.id = "myCanvas";
  if(windowHeight > windowWidth) {
    myCanvas.style.width = "95vw"
    myCanvas.style.height = "95vw"
  } else {
    myCanvas.style.width = "95vh"
    myCanvas.style.height = "95vh"
  }


  background(0)
  image(img,0,(height-img.height)/2)


  img.loadPixels()
  for (var i = 0; i < 5; i++) {
    colors.push(img.get(random(img.width), 
                        random(img.height)
                        )
                )
  }

  for(var x=0; x<img.width; x++) {
    for(var y=0; y<img.height; y++) {
      var ind = 4*(y*img.width + x)
      var r = img.pixels[ind],
          g = img.pixels[ind+1],
          b = img.pixels[ind+2],
          a = img.pixels[ind+3]
      // img.pixels[ind] = (g + b)/2;
      // img.pixels[ind+1] = (b + r)/2;
      // img.pixels[ind+2] = (r + g)/2; 
      //var currColor = img.get(x,y)
      img.set(x,y,getNearestColor([r,g,b,a], colors))
    }    
  }


  img.updatePixels()
  img.resizeNN(width,0)
  image(img,0,0)

  noStroke()
  for (var i = 0; i < colors.length; i++) {
    var col = colors[i];
    fill(col)
    rect((i+.25)/colors.length * width, 
            height*.85, 
            width*.05,
            width*.05)
  }
}

function getNearestColor(c,arr) {
  var dist = 1e7;
  var nearestColorInd = 0;
  for (var i = 0; i < arr.length; i++) {
    var testColor = arr[i],
    testDist = sq(testColor[0]-c[0])
              +sq(testColor[1]-c[1])
              +sq(testColor[2]-c[2])
              +sq(testColor[3]-c[3])   
                   

    if(testDist < dist) {
      dist = testDist
      nearestColorInd = i      
    }
  }
  return arr[nearestColorInd]
} 

p5.Image.prototype.resizeNN = function(width, height) {
  if (width === 0 && height === 0) {
    width = this.canvas.width;
    height = this.canvas.height;
  } else if (width === 0) {
    width = this.canvas.width * height / this.canvas.height;
  } else if (height === 0) {
    height = this.canvas.height * width / this.canvas.width;
  }

  width = Math.floor(width);
  height = Math.floor(height);

  var temp = createImage(width,height),
    xScale = width / this.width ,
    yScale = height / this.height

  this.loadPixels()
  temp.loadPixels()
  for(var x=0; x<temp.width; x++) {
    for(var y=0; y<temp.height; y++) {
      var sourceInd = 4*(Math.floor(y/yScale)*this.width + Math.floor(x/xScale))
      var targetInd = 4*(y*temp.width + x)
      var sourceP = this.pixels.slice(sourceInd,sourceInd+4)//this.get(x/wScale, y/hScale)
      temp.pixels[targetInd] = sourceP[0]
      temp.pixels[targetInd+1] = sourceP[1]
      temp.pixels[targetInd+2] = sourceP[2]
      temp.pixels[targetInd+3] = sourceP[3]
    }
  }
  temp.updatePixels()
  this.updatePixels()

  this.canvas.width = this.width = width;
  this.canvas.height = this.height = height;

  this.drawingContext.drawImage(temp.canvas,
    0, 0, width, height,
    0, 0, width, height
  )
};
