let img;
let zoff = 0;
let inc = 0.5;

function preload() {
	img = loadImage('meBWInv.png');
}

function setup() {
  createCanvas(900, 900);
}

function draw() {
  background(0, 50, 50);
  noStroke();
  fill(200, 50, 50);

  let spacing = 900 / img.width;
  for (let y = 0; y < img.height; y += 1.4) {
    for (let x = 0; x < img.width; x += 1.4) {
      let in_color = img.get(x, y);
      let dot_size = lightness(in_color) / 255 * 25;
      ellipse(x * spacing + spacing * .5, y * spacing + spacing * .5, dot_size + sin(zoff) * 2, dot_size + sin(zoff) * 2);
    }
  }
  zoff += inc;
}
