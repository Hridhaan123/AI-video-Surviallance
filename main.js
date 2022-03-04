video = "";
status = "";
objects = [];

function preload() {
    video = createVideo("video.mp4");
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotresult);
        for (i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "No of detected are : "+objects.length;
            fill("lightgreen");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects...";
}

function modelloaded() {
    console.log("modelloaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}