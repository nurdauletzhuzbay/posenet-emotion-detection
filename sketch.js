let video;
let poseNet;
let pose;
let skeleton;
let happy_time = 0;
let disgust_time = 0;
let garbage_time = 0;
let scary_time = 0;
let happy_c = 0;
let garbage_c = 0;
let disgust_c = 0;
let scary_c = 0;


function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('PoseNet Ready');
}
  
//Functions for printing the names of emotions
function happy() {
    return "Happy!";
}
function disgust() {
    return "Disgust!";
}
function garbage() {
    return "Garbage emotion!";
}
function scary() {
    return "Scary!";
}

//Time in JS flows differently so 720 coefficient had to be chosen
function happy_seconds() {
    return Math.floor(happy_time++ / 720) + " sec";
}
function disgust_seconds() {
    return Math.floor(disgust_time++ / 720) + " sec";
}
function garbage_seconds() {
    return Math.floor(garbage_time++ / 720) + " sec";
}
function scary_seconds() {
    return Math.floor(scary_time++ / 720) + " sec";
}

// ALso, by experienced way 2680 was chosen
function happy_count() {
    return Math.floor(happy_c++ / 2680) + " times";
}
function garbage_count() {
    return Math.floor(garbage_c++ / 2680) + " times";
}
function disgust_count() {
    return Math.floor(disgust_c++ / 2680) + " times";
}
function scary_count() {
    return Math.floor(scary_c++ / 2680) + " times";
}

// Main function
function draw() {
    //setting up the video, mirroring and scaling
    image(video, 0, 0, width, height);
    translate(video.width, 0);
    scale(-1,1);
    image(video, 0, 0, video.width, video.height);
    if (pose) {
        for (let i = 0; i < pose.keypoints.length; i++) {
            //extracting x and y coordinates of the body keypoints
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(255, 0, 253);
            ellipse(x, y, 16, 16);
            //happy emotion
            //if left and right wrists in y coordinate are higher than the nose -> happy
            if ((pose.keypoints[9].position.y || pose.keypoints[10].position.y) < (pose.keypoints[0].position.y)){
                document.getElementById("emotion").innerHTML = happy();
                document.getElementById("seconds1").innerHTML = happy_seconds();
                document.getElementById("count1").innerHTML = happy_count();
            } 
            //disgust emotion
            //if left or right wrists in x coordinate stay in the right of the nose -> disgusted
            else if ((pose.keypoints[9].position.x || pose.keypoints[10].position.x) < (pose.keypoints[0].position.x)){
                document.getElementById("emotion").innerHTML = disgust();        
                document.getElementById("seconds2").innerHTML = disgust_seconds();
                document.getElementById("count2").innerHTML = disgust_count();
            } 
            //scared emotion
            //if left wrist in x-coordinate is to the right of left shoulder 
            // AND right wrist in x-coordinate to the left of right shoulder
            // AND left wrist in y-coordinate is higher than left elbow
            // AND right wrist in y-coordinate is higher than right elbow -> scared
            else if (pose.keypoints[9].position.x < pose.keypoints[5].position.x && 
                pose.keypoints[10].position.x > pose.keypoints[6].position.x && 
                pose.keypoints[9].position.y < pose.keypoints[7].position.y && 
                pose.keypoints[10].position.y < pose.keypoints[8].position.y){
                  document.getElementById("emotion").innerHTML = scary();
                  document.getElementById("seconds3").innerHTML = scary_seconds();
                  document.getElementById("count3").innerHTML = scary_count();
            } 
            //everyting else is garbage state
            else {
                document.getElementById("emotion").innerHTML = garbage();
                document.getElementById("seconds4").innerHTML = garbage_seconds();
                document.getElementById("count4").innerHTML = garbage_count();
            }               
         }
         //drawing the skeleton of the keypoints
        for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
     }
}