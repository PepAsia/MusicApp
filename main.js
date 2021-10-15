function preload()
{
    song = loadSound("Harry Potter.mp3");
    song_1 = loadSound("Peter Pan.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
}
function modelLoaded()
{
    console.log('PoseNet model is Loaded');
}
function draw()
{
    image(video, 0, 0, 600, 500);
}