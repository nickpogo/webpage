// local variables: a1, a2, w1, w2
// parameters: r1, r2, m1, m2, g (gravitational costant)
class DoublePendulum {
  constructor(a1, a2, w1, w2, r1, r2, m1, m2, g) {
    this.a1 = a1;
    this.a2 = a2;
    this.w1 = w1;
    this.w2 = w2;
    this.r1 = r1;
    this.r2 = r2;
    this.m1 = m1;
    this.m2 = m2;
    this.g = g;
    this.prev_x = null;
    this.prev_y = null;
  }

  update(dt) {
    // here we describe how local vars changes in time

    let a11 = (this.m1 + this.m2) * this.r1;
    let a12 = this.m2 * this.r2 * cos(this.a2 - this.a1);
    let a21 = this.r1 * cos(this.a2 - this.a1);
    let a22 = this.r2;
    let s1 = this.m2 * this.r2 * this.w2 * this.w2 * sin(this.a2 - this.a1);
    let s2 = -(this.m1 + this.m2) * this.g * sin(this.a1);
    let b1 = s1 + s2;
    s1 = -this.r1 * this.w1 * this.w1 * sin(this.a2 - this.a1);
    s2 = -this.g * sin(this.a2);
    let b2 = s1 + s2;

    // compute acceleration
    let delta = a11 * a22 - a12 * a21;
    let delta1 = b1 * a22 - b2 * a12;
    let delta2 = a11 * b2 - a21 * b1;

    let ac1 = delta1 / delta;
    let ac2 = delta2 / delta;

    // update vars
    this.a1 += (dt * this.w1);
    this.a2 += (dt * this.w2);
    this.w1 += (dt * ac1);
    this.w2 += (dt * ac2);
  }

  show(mscale, rscale, front, back, r, g, b) {

    // convert from local coordinates to cartesian
    let x1 = rscale * this.r1 * sin(this.a1);
    let y1 = rscale * this.r1 * cos(this.a1);
    let x2 = x1 + rscale * this.r2 * sin(this.a2);
    let y2 = y1 + rscale * this.r2 * cos(this.a2);

    // draw pendulum
    // front.background(0);
    front.stroke(255);
    front.line(0, 0, x1, y1);
    front.line(x1, y1, x2, y2);
    front.fill(255);
    front.ellipse(x1, y1, mscale * this.m1, mscale * this.m1);
    front.ellipse(x2, y2, mscale * this.m2, mscale * this.m2);

    // draw trace
    if (this.prev_x != null) {
      back.stroke(r, g, b, 50);
      back.line(this.prev_x, this.prev_y, x2, y2);
    }

    this.prev_x = x2;
    this.prev_y = y2;
  }
}

let foreground;
let background;

let a1 = 0.5; // first angle
let a2 = 1.5; // second angle
let w1 = 0; // first angular velocity
let w2 = 0; // second angular velocity
let r1 = 2; // first radius
let r2 = 2; // second radius
let m1 = 1; // first mass
let m2 = 1; // second mass
let g = 9.8; // gravity

let p = new DoublePendulum(a1, a2, w1, w2, r1, r2, m1, m2, g);
let p2 = new DoublePendulum(a1 + 0.1, a2, w1, w2, r1, r2, m1, m2, g);

function setup() {
  createCanvas(400, 300);
  foreground = createGraphics(400, 300);
  background = createGraphics(400, 300);
  foreground.translate(foreground.width / 2, foreground.height / 2);
  background.translate(background.width / 2, background.height / 2);
}

function draw() {
  foreground.background(0);
  p.show(10, 33, foreground, background, 255, 255, 0);
  p.update(1 / 60);
  p2.show(10, 33, foreground, background, 255, 0, 255);
  p2.update(1 / 60);
  image(foreground, 0, 0);
  image(background, 0, 0);
}