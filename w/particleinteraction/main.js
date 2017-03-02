var ps = [], settings, wait //used in clearing particles after showing them
    params = {
      numParticles: 50,
      drawDist: 60, 
      interactDist: 60, 
      forceMultiplier: 0.001,
      showParticles: false,
      friction: 0.001,
      farAlpha: 0, 
      closeAlpha: 50,
      trails: 0,
      boxed: true
    }

function setup() {
  var myCanvas = createCanvas(600, 600).elt;
  myCanvas.id = "myCanvas";
  if(windowHeight > windowWidth) {
    myCanvas.style.width = "95vw"
    myCanvas.style.height = "95vw"
    settings = QuickSettings.create(windowWidth*.5-100, windowHeight*0.95, "settings");
  } else {
    myCanvas.style.width = "95vh"
    myCanvas.style.height = "95vh"
    settings = QuickSettings.create(0,0,"settings")
  }
  
  for(var i=0; i<params.numParticles; i++) {
    ps.push(new Particle(random(width), random(height)));
  }  
  stroke(255)
  background(0)

  initSettings();
}

function draw() {
  if(params.showParticles) {
    background(0)
    wait = 0;
  } else if(wait<1) {
    wait++
    background(0)
  }
  background(0,params.trails)

  for(var i=0; i<ps.length; i++) {
    var p1 = ps[i];
    p1.update()
    if(params.showParticles) p1.show()
    for(var j=i+1; j<ps.length; j++) {
      var d = p1.pos.dist(ps[j].pos),
          p2 = ps[j];            

      if(d < params.drawDist) {
        stroke(255, map(d,0,params.drawDist,params.closeAlpha,params.farAlpha))
        line(p1.pos.x,p1.pos.y,p2.pos.x,p2.pos.y)
      }
      
      if(d < params.interactDist) {
        p2.vel.add(p5.Vector.sub(p2.pos,p1.pos).mult(params.forceMultiplier))
        p1.vel.add(p5.Vector.sub(p1.pos,p2.pos).mult(params.forceMultiplier))
      }
    }
  }
}

function keyTyped() {
  if(key===' ') {
    background(0)
    return false;
  } else if(key==='s') {
    showParticles()
  } else if (key==='d') {
    resetParticles()
  }
}

function initSettings() {
  settings
    .addHTML('keyboard shortcuts', "<strong>spacebar</strong> to clear canvas<br><strong>d</strong> to reset particles<br><strong>s</strong> to show particles")
    .bindRange("numParticles", 0, 200, params.numParticles, 1, params)
    .bindRange("drawDist", 0, 500, params.drawDist, 1, params)
    .bindRange("interactDist", 0, 500, params.interactDist, 1, params)
    .bindBoolean("showParticles", params.showParticles, params, function(val){
      background(0)
      draw() 
    })
    .bindRange("closeAlpha", 0, 255, params.closeAlpha, 1, params)
    .bindRange("farAlpha", 0, 255, params.farAlpha, 1, params)
    .bindRange("forceMultiplier", -0.02, 0.02 , params.forceMultiplier, 0.001, params)
    .bindRange("friction", 0, 0.1 , params.friction, 0.001, params)
    .bindRange("trails", 0, 255, 5, 1, params)
    .bindBoolean("boxed", params.boxed, params) 
    .addButton('save image',function(){
      save("particleinteraction/"+int(random(10000))+".png")
    })
    .addButton('reset particles',resetParticles)
    .addButton('clear canvas', background,0) 
}

function resetParticles() {
  ps = []
  for(var i=0; i<params.numParticles; i++) {
    ps.push(new Particle(random(width), random(height)));
  }  
  background(0)
}

function showParticles() {
  params.showParticles = !params.showParticles;
  settings.setValue('showParticles', params.showParticles)
}