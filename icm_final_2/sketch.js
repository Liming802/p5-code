// The array containing lines of the poem
let poem1Lines = [
  "In the northern sky, where darkness meets light",
  "Aurora dances a celestial sight",
  "Through the ages her colors unfold",
  "A timeless story, in hues of gold",

  "Time pauses briefly, as the lights sway",
  "Aurora's dance, a cosmic display",
  "Through the night, in a celestial rhyme",
  "She paints the heavens, one dance at a time."
];

// Variables for image capture and facial tracking
let capture = null;
let tracker = null;
let positions = null;
let w = 0, h = 0;
let eyeCenter;
let image1;
let image2;

// Preload function to load images before setup
function preload() {
  image1 = loadImage('image1.png');
  image2 = loadImage('image2.png');
}

// Setup function
function setup() {
  // Set up canvas and capture video
  background(0);
  capture = createCapture(VIDEO);
  createCanvas(image1.width+500, image1.height+500);
  capture.size(screen.width, screen.height);
  capture.hide();

  // Initialize and start the face tracker
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

  // Set text alignment and size
  textAlign(LEFT, TOP);
  textSize(30);
}

// Draw function
function draw() {
  // Flip the video horizontally
  translate(image1.width, 0);
  scale(-1.0, 1.0);

  // Get current facial positions
  positions = tracker.getCurrentPosition();

  if (positions.length > 0) {
    // Display the first image
    image(image1, -450, 200, image1.width, image1.height);

    // Get the center of the left eye
    eyeCenter = getPoint(62);

    // Map thickness values based on eye position
    let thicknessBlue = map(eyeCenter.x, 0, width / 4, 0, 2);
    let thicknessWhite = map(eyeCenter.x, (3 * width) / 4, width, 2, 0);

    // Apply a visual effect based on mapped values
    for (let x = 0; x < width; x += thicknessBlue + thicknessWhite) {
      copy(image2, x, 0, thicknessBlue, height, x-450, 200, thicknessBlue, height);
    }
  }

  // Display the poem text
  push();
  scale(-1.0, 1.0);
  fill(255);
  for (let i = 0; i < poem1Lines.length; i++) {
    text(poem1Lines[i], -420, (i + 2) * 30);
  }
  pop();
}

// Function to get a specific point from the facial positions
function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}
