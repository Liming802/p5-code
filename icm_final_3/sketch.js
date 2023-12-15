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
let image3;
let image4;

// Preload function to load images before setup
function preload() {
  image1 = loadImage('image1.png');
  image3 = loadImage('image3.png');
  image4 = loadImage('image4.png');
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
  imageMode(CENTER)
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

    eyeCenter = getPoint(37);
    let distance = dist(getPoint(22).x, getPoint(22).y, getPoint(37).x, getPoint(37).y);

    let x62 = eyeCenter.x;
    let y62 = eyeCenter.y;
  
    let imageSize = map(distance, 10, 200, 200, 2000); 
    let adjustedSize1 = map(imageSize, 1000, 2000, 1000, 500);

    image(image1, x62-800, y62-200, adjustedSize1+600, adjustedSize1+600);
    image(image3, 100, 500, imageSize+200, imageSize);
  }
    image(image4, 100, 500,width+500,height+200);
  // Display the poem text
  // push();
  // scale(-1.0, 1.0);
  // fill(255);
  // for (let i = 0; i < poem1Lines.length; i++) {
  //   text(poem1Lines[i], -420, (i + 2) * 30);
  // }
  // pop();
}

// Function to get a specific point from the facial positions
function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}
