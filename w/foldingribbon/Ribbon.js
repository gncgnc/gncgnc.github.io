function Ribbon(x, y) {
  this.currTile = new Tile(x, y, 0)

  this.tiles = []
  this.tiles.push(this.currTile)

  this.size = tileSize || width / 20;

  this.col1 = col1 || color(100, 0, 100, 150)
  this.col2 = col2 || color(100, 255, 100, 150)

  this.straigtWeight = straigtWeight===undefined ? 3 : straigtWeight;  
  
  this.show = function() {
    for (var i = 0; i < this.tiles.length; i++) {
      var col = lerpColor(this.col1, this.col2, 1.0*i/this.tiles.length)
      //fill(100, (1.0 * i / this.tiles.length) * 255, 100, 150)
      fill(col);
      this.tiles[i].show()
    }
  }
  
  this.next = function(){
    var dir = this.getNextDir(),
        nextX = this.currTile.x + this.size * dir.x,
        nextY = this.currTile.y + this.size * dir.y
        
    var nextTile = new Tile(nextX, nextY, 0)
    
    this.tiles.push(nextTile)
    this.currTile = nextTile
    this.updateFold();
  }
  
  this.updateFold = function(){
    if(this.tiles.length>2){
      var curr = this.tiles[this.tiles.length-2],
          next = this.tiles[this.tiles.length-1],
          prev = this.tiles[this.tiles.length-3],
          v1 = {x: curr.x-prev.x, y: curr.y-prev.y},
          v2 = {x: next.x-curr.x, y: next.y-curr.y},
          dir1 = this.getDirFromVector(v1),
          dir2 = this.getDirFromVector(v2);
      
      var tileTypeDict = {
        0: {1: 2, 3: 3} ,
        1: {0: 4, 2: 3} ,
        2: {1: 1, 3: 4} ,
        3: {0: 1, 2: 2}
      }
      curr.type = tileTypeDict[dir1][dir2]
      if(dir1 === dir2) curr.type = 0;     
    }   
  }
  
  //gets numberised direction of a vector with strictly one "0" component
  this.getDirFromVector = function(v){
    if(v.x!==0 && v.y!==0) return console.log("getDir: v has diagonal component")
    if(v.y === 0){
      if(v.x > 0) return 0;
      else return 2
    } else {
      if(v.y > 0) return 1
      else return 3
    }
  }
  
  //gets in which direction the next tile will be created.
  this.getNextDir = function(){
    var dirDict = {
          0: {x: 1, y: 0},
          1: {x: 0, y: 1},
          2: {x: -1, y: 0},
          3: {x: 0, y: -1},
        }
    if(this.tiles.length<2) return dirDict[int(random(4))]
    
    var curr = this.tiles[this.tiles.length-1],
        prev = this.tiles[this.tiles.length-2],
        v = {x: curr.x-prev.x, y: curr.y-prev.y},
        currDir = this.getDirFromVector(v),
        possibilities = []
    
    for (var i = 0; i < 4; i++) {
      if (i !== (currDir+2)%4) possibilities.push(i) //shouldn't go the opposite direction
    }
    for (var i = 0; i < this.straigtWeight; i++){
      possibilities.push(currDir)   
    }
    
    return dirDict[random(possibilities)]
  }
}
