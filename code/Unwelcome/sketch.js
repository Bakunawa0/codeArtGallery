//let flock;

function setup() {
  createCanvas(displayWidth*pixelDensity(), displayHeight*pixelDensity());
  //createP("Drag the mouse to generate new Berds.");

  flock = new Flock();
  // Add an initial set of Berds into the system
  // for (let i = 0; i < 150; i++) {
  //   let b = new Berd(width / 2,height / 2);
  //   flock.addBerd(b);
  // }
}

function draw() {
  background(51);
  flock.run();
}

// Add a new Berd into the System
function mouseDragged() {
  flock.addBerd(new Berd(mouseX, mouseY));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the Berds

function Flock() {
  // An array for all the Berds
  this.Berds = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.Berds.length; i++) {
    this.Berds[i].run(this.Berds);  // Passing the entire list of Berds to each Berd individually
  }
}

Flock.prototype.addBerd = function(b) {
  this.Berds.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Berd class
// Methods for Separation, Cohesion, Alignment added

function Berd(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
  this.color = random(360);
}

Berd.prototype.run = function(Berds) {
  this.flock(Berds);
  this.update();
  this.borders();
  this.render();
}

Berd.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Berd.prototype.flock = function(Berds) {
  let sep = this.separate(Berds);   // Separation
  let ali = this.align(Berds);      // Alignment
  let coh = this.cohesion(Berds);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Berd.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Berd.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Berd.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  colorMode(HSB, 360, 100, 100, 1);
  fill(this.color, 100, 100);
  stroke(10);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r * 3);
  vertex(-this.r, this.r * 2.5);
  vertex(this.r, this.r * 2.5);
  endShape(CLOSE);
  pop();
}

// Wraparound
Berd.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby Berds and steers away
Berd.prototype.separate = function(Berds) {
  let desiredseparation = 25.5;
  let mouseseparation = 45.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every Berd in the system, check if it's too close
  for (let i = 0; i < Berds.length; i++) {
    let d = p5.Vector.dist(this.position,Berds[i].position);
    let mpos = createVector(mouseX,mouseY);
    let md = p5.Vector.dist(this.position,mpos);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, Berds[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
    if ((md > 0) && (md < mouseseparation)) {
      // Calculate vector pointing away from mouse
      let diff = p5.Vector.sub(this.position, mpos);
      diff.normalize();
      diff.div(md*2);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby Berd in the system, calculate the average velocity
Berd.prototype.align = function(Berds) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < Berds.length; i++) {
    let d = p5.Vector.dist(this.position,Berds[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(Berds[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby Berds, calculate steering vector towards that location
Berd.prototype.cohesion = function(Berds) {
  let neighbordist = 90;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < Berds.length; i++) {
    let d = p5.Vector.dist(this.position,Berds[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(Berds[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}