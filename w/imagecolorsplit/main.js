'use strict'

var img, colors = [], canvasElt, numColors = 5;

function preload() {
  img = loadImage("http://unsplash.it/256?random")
  //image=1049")
  //image=913")
}


function setup() {
  var canvasElt = createCanvas(600,600);
  canvasElt.id = "myCanvas";
  if(windowHeight > windowWidth) {
    canvasElt.style.width = "95vw"
    canvasElt.style.height = "95vw"
  } else {
    canvasElt.style.width = "95vh"
    canvasElt.style.height = "95vh"
  }

  background(0)
  image(img,0,(height-img.height)/2)

  processImage();

  image(img,0,0)

  noStroke()

  // palette aesthetic~~~~ 
  // for (var i = 0; i < colors.length; i++) {
  //   var col = colors[i];
  //   fill(col)
  //   rect((i+.25)/colors.length * width, 
  //           height*.85, 
  //           width*.05,
  //           width*.05)
  // }

  canvasElt.dragOver(function() {
    canvasElt.style("border", "solid"); 
  });
  canvasElt.dragLeave(function() {
    canvasElt.style("border", "hidden");
  });
  canvasElt.drop(function(file) {
    // var imgElt = createImg(file.data).hide();
    // img = loadImage(imgElt.elt.src)
    console.log(file)
    img = loadImage(file.data, function() {
      img.resizeNN(256,0);
      processImage()
      background(0)
      image(img,0,(height-img.height)/2)
    })
  }, function() {
    canvasElt.style("border", "hidden");
  });
}


// 
function processImage() {
  img.loadPixels()

  // get random colors
  colors = []
  for (var i = 0; i < numColors; i++) {
    colors.push(img.get(random(img.width), 
                        random(img.height)
                        )
                )
  }

  // split image by colors
  for(var x=0; x<img.width; x++) {
    for(var y=0; y<img.height; y++) {
      var ind = 4*(y*img.width + x)
      var r = img.pixels[ind],
          g = img.pixels[ind+1],
          b = img.pixels[ind+2],
          a = img.pixels[ind+3]

      // set pixel to nearest color 
      // - can just find nearest color and set to a different color  
      img.set(x,y,getNearestColor([r,g,b,a], colors))
    }    
  }
  img.updatePixels()

  // resize the image for psuedo-resolution
  img.resizeNN(width,0)
}

// HELPERS
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
      var sourceP = this.pixels.slice(sourceInd,sourceInd+4)
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
