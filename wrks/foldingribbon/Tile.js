var Tile = function(x,y,type){
  this.x = x;
  this.y = y;
  this.type = type;
  
  this.size = tileSize || width/20; 
  
  this.show = function(){
    push()
    var trX = this.wrap(this.x, width),
        trY = this.wrap(this.y, height); 
    translate(trX, trY)
    switch(this.type){
      case 0: 
        rect(0, 0, this.size, this.size)
      break;
      
      case 1: case 2: case 3: case 4: 
        this.drawFold(this.type)
      break;
        
      default:
    }
    pop()
  }
  
  this.drawFold = function(type){
    push()
    translate(this.size*0.5, this.size*0.5)
    rotate((type-1)*HALF_PI)
    translate(-this.size*0.5, -this.size*0.5)
    triangle(this.size, 0, 
             this.size, this.size, 
             0, this.size)
    triangle(this.size, 0, 
             this.size, this.size, 
             0, this.size)
    pop()
  }

  this.wrap = function(x, bin){
    return x - floor(x / bin) * bin
  }
}