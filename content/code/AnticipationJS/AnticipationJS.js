function setup() {
  createCanvas(800,800);
  noFill();
  stroke(255);
  strokeWeight(2);
}

function r(theta, a, b, m, n1, n2, n3){
  return pow(pow(abs(cos(m*theta/4.0)/a), n2)+
  pow(abs(sin(m*theta/4.0)/b), n3), -1.0/n1);
} // the superformula

let t = 0.0;

function draw() {
  background(0);
  
  translate(width/2, height/2); // move the origin to the center of the screen
  
  beginShape();
  for (let theta = 0.0; theta <= 2*PI; theta+=0.01){ // rotate theta through all angles
    let rad = r(theta, sin(t)*0.2+random(4, 5), sin(t)*0.2+random(4, 5), 2, 1, 1, 1); // this makes an eye looking shape
    let x = rad*cos(theta)*50; // convert polar coords...
    let y = rad*sin(theta)*50; // ... to cartesian coords
    vertex(x, y); // plot the point on-screen
  }
  endShape();
  
  beginShape();
  for (let theta = 0.0; theta <= 2*PI; theta+=0.01){
    let rad = r(theta, 2, 2, 50, 1, sin(t)*0.2+random(0.3, 0.9), cos(t)*0.2+0.9); // this makes the pupil
    let x = rad*cos(theta)*50;
    let y = rad*sin(theta)*50;
    vertex(x, y);
  }
  endShape();
  
  t+=0.04;
}
