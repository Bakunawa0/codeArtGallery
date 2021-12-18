let walkers = [];
let xoff = 0;
let img;

function preload() {
	img = loadImage('nor.jpeg');
}

function setup() {
	createCanvas(img.width, img.height);
	//strokeWeight(3);
	tOut = createP('');

	for(let i = 0; i <= 150; i++){
		walkers[i] = new Walker();
	}

	background(0);
}

function draw() {
	//background(220);
	for(let i = 0; i < walkers.length; i++){
		walkers[i].step('noRetreat', randomizer(xoff));
		walkers[i].edges();
		walkers[i].show(img);
		tOut.html(floor(frameRate()));
		xoff += 0.005;
	}
	if(frameCount == 2117){ // Frame value found through experimentation
		img = loadImage('and.jpeg');
	}
	if(frameCount == 4848){
		img = loadImage('source.png')
	}
}

function randomizer(x){

	let dir = floor(noise(x) * 3);
	//let dir = floor(random(4));
	return dir;
}
