function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "status: Detecting Objects";
 
}


img = "";
status = "";
objects = [];
song= "";

function modelLoaded() {
  console.log("model loaded");
  status = true;
 
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function preload() {
  img = loadImage('dog_cat.jpg');
  song= loadSound('ringing_old_phone.mp3');
}

function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    objectDetector.detect(video, gotResult);
    r= random(255);
    g= random(255);
    b= random(255);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "status: Objects Detected";
     
      fill(r,g,b);
      percent = floor(objects[i].confidence*100);
      text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if (objects[i].label=="person") {
        song.stop();
        document.getElementById("number_of_objects").innerHTML = "baby found";
      } else {
        song.play();
        document.getElementById("number_of_objects").innerHTML = "baby not found";
      }
    }



  }

}