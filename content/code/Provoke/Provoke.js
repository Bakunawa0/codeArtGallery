function setup() {
  createCanvas(800, 600);
  //noFill();
  fill(255);
  stroke(0);
  strokeWeight(2);
}

let t = 0;

function r(theta, a, b, m, n1, n2, n3){
  return pow(pow(abs(cos(m*theta/4.0)/a), n2)+
  pow(abs(sin(m*theta/4.0)/b), n3), -1.0/n1);
} // the superformula

function draw() {
  background(128);
  
  translate(width/2, height/2); // move the origin to the center of the screen
  //print("X: "+mouseX+", Y: "+mouseY);
  beginShape();
  for (let theta = 0.0; theta <= 2*PI; theta+=0.01){
    let rad = r(
    theta,
    2.5, // a
    2.5, // b
    4,// m
    map(mouseX, width+462, 0, 0.09, 1, true), // n1, also 462 is just a nice limit that I found
    sin(t)*0.2+random(map(mouseY, 0, height, 0.3, 0.8, true), 0.9), // n2
    sin(t)*0.2+0.9 // n3
    ); // separated out for readability
    
    let x = rad*cos(theta)*50;
    let y = rad*sin(theta)*50;
    vertex(x, y);
  }
  endShape();
  t=0.15;
}
