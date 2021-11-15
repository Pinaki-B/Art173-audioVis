const VIZ_LENGTH = 64

let input
let fft

let STATIC_TEST = [VIZ_LENGTH]

let grid = new Array(VIZ_LENGTH)
const RADIUS = 10
const HEIGHT = 30

let cnt = 0;

function setup() {
  createCanvas(500, 500);
  // Create an Audio input
  input = new p5.AudioIn();
  input.start();
  fft = new p5.FFT(.8, VIZ_LENGTH)
  fft.setInput(input)

  for (let i = 0; i < VIZ_LENGTH; i++) {
    STATIC_TEST[i] = random(80) + 20;
    console.log("This is working")
  }

  for (let i = 0; i < grid.length; i++) {
    grid[i] = {
      x : map(i, 0, VIZ_LENGTH-1, 0, innerWidth),
      y : 0
    }
  }
  noStroke()
}

function draw() {
  // if (cnt % 10 == 0) {
  //   // print(new Set(fft.analyze()))
  //   // print(input.getLevel())
  //   // print(fft.analyze())
  //   background(220);

  //   cnt = 0;
  //   drawAmplitudes(fft.analyze())
  // }
  // cnt++;
  background(220);
  updateAmplitudes(fft.analyze())
  drawGrid();
}

function updateAmplitudes(amplitudes) {
  for (let i = 0; i < grid.length; i++) {
    // line(i + 20, 200, i + 20, 200-amplitudes[i])
    grid[i].y = map(amplitudes[i], 0, 255, 0, HEIGHT);
  }
}

function drawGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].y; j++) {
      circle(grid[i].x, map(j, 0, HEIGHT, 0+RADIUS, innerHeight-RADIUS), RADIUS)
    }
  }
}
