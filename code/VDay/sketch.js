const MAX_HEIGHT = 600;
const MAX_WIDTH = 700;
const STEP = 8;

let img;

function preload(){
  img = loadImage('tav1.png');
}

function setup() {
  createCanvas(MAX_HEIGHT, MAX_WIDTH);
  stroke(169, 251, 215);
  strokeWeight(2);
  background(0, 32, 63);
  noLoop();
}

function draw() {
  const lines = [];
  for (let i = STEP; i < MAX_HEIGHT - STEP; i += STEP) {
    let line = [];
    for (let j = STEP; j <= MAX_HEIGHT - STEP; j += STEP) {
      let point = { x: j, y: i + map(lightness(img.get(j, i)), 0, 255, 50, 0) };
      line.push(point)
    }
    lines.push(line);
  }


  //draw
  for (let i = 5; i < lines.length; i++) {
    beginShape();
    for (let j = 0; j < lines[i].length; j += 2) {
      curveVertex(lines[i][j].x, lines[i][j].y);
      fill(0, 0, 0, 0);
      curveVertex(lines[i][j + 1].x, lines[i][j + 1].y)
    }
    endShape();
  }
}