let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let shoulderX = 0;
let shoulderY = 0;
let firstLocation;
let secondLocation;
let target;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
 
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  // creating empty vectors
  firstLocation = createVector(0,0);
  target = createVector(0,0);
}


function gotPoses(poses) {
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[2].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    let sX = poses[0].pose.keypoints[5].position.x;
    let sY = poses[0].pose.keypoints[5].position.y;
    noseX = nX;
    noseY = nY;
    eyelX = eX;
    eyelY = eY;
    shoulderX = sX;
    shoulderY = sY;
  }
}


function modelReady() {
  console.log('model ready');
}


function draw() {
  image(video, 0, 0);
  fill(0,0,255);
 
  // set vectors to keypoints values
  firstLocation.set(noseX, noseY);
  target.set(noseX, noseY)
 
  // make a circle follow target loaction
  let distance = target.dist(firstLocation);
  let mappedDistance = map(distance, 100, 0, 1.5, 0.5);
  target.sub(firstLocation);
  // target.normalize();
  // target.mult(mappedDistance);  
  firstLocation.add(target);
 
  ellipse(firstLocation.x, firstLocation.y,50);
  console.log(target.x,target.y);
}


