let pts = [];
let minDistRatio = 0.1;
let minDist;
let minDistRatioSlider;
let ui;
let canvas;

function setup() {
	if(windowWidth > windowHeight) { 
		canvas = createCanvas(windowWidth*0.9, windowHeight) 
	} else {
		canvas = createCanvas(windowWidth, windowHeight*0.9)
	}
	minDist = min(width, height) * minDistRatio;



	ui = select("#ui")


	minDistRatioSlider = createSlider(0, 0.5, 0.1, 0.01);
	minDistRatioSlider.changed(minDistSliderCallback)	
	ui.child(minDistRatioSlider)

	clearButton = createButton("Clear")
	clearButton.mousePressed(clearBackground)
	ui.child(clearButton)

	stroke(0);
}

function draw() {
}

function minDistSliderCallback() {
	minDistRatio = minDistRatioSlider.value();
	minDist = min(width, height) * minDistRatio;
}

function clearBackground() {
	background(255)
	pts = []
}

function update() {
	let pt = new p5.Vector(mouseX, mouseY);
	pts.push(pt);
	connectPt(pt);		
}

function connectPt(pt) {
	for (let i=0; i<pts.length-1; i++) {
		let other = pts[i];
		let dsq = distSq(pt, other) 
		if (dsq < minDist**2) {
			stroke(0, 255 * (1 - dsq/(minDist**2)))
			line(pt.x, pt.y, other.x, other.y);
		}
	}
}

function connectPts() {
	for (let i=0; i<pts.length; i++){
		let pt = pts[i];
		for (let j=i; j<pts.length; j++) {
			let other = pts[j];
			let dsq = distSq(pt, other) 
			if (dsq < minDist**2) {
				stroke(0, 255 * (0.8 - dsq/(minDist**2)))
				line(pt.x, pt.y, other.x, other.y);
			}
		}
	}
}

function mousePressed() {
	update();
}

function mouseDragged() {
	update();
}

let distSq = function(v1, v2) {
	return (v1.x - v2.x)**2 +  (v1.y - v2.y)**2;
}