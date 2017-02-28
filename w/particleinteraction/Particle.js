function Particle(x, y) {
  this.pos = new p5.Vector(x,y); 
  this.vel = p5.Vector.random2D().mult(random(-5,5))
  this.acc = new p5.Vector()
  this.nstart = random(100);
  this.counter = 0;
  
  this.update = function() {      
    this.pos.add(this.vel);  
    this.vel.add(this.acc)
    this.vel.sub(p5.Vector.mult(this.vel, params.friction))
    
    if(this.vel.mag() > 5) this.vel.setMag(5)
    
    if(params.boxed) {
      if(this.pos.x > width || this.pos.x <= 0) this.vel.x = -1*this.vel.x
      if(this.pos.y > height || this.pos.y <= 0) this.vel.y = -1*this.vel.y;
    } else {
      if(this.pos.x > width) this.pos.x = 0
      else if(this.pos.x <= 0) this.pos.x = width;
      if(this.pos.y > height) this.pos.y = 0;
      else if(this.pos.y <= 0) this.pos.y = height;      
    }
    
    this.counter++
  }
  
  this.show = function() {
    ellipse(this.pos.x, this.pos.y,5,5)
  }
} 