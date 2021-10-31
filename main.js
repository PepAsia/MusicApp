first_music = "";
second_music = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";

function preload()
{
    first_music = loadSound("Harry Potter.mp3");
    second_music = loadSound("Peter Pan.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log('PoseNet model is Loaded');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
function draw()
{
    image(video, 0, 0, 600, 500);
    
    status_song1 =  first_music.isPlaying();
    status_song2 = second_music.isPlaying();

    fill("F71010");
    stroke("F71010");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
       second_music.stop();
       if(status_song1 == false)
       {
           first_music.play();
           document.getElementById("song").innerHTML = "Song Name = " + first_music;
       }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY,20);
        first_music.stop();
        if(status_song2 == false)
        {
            second_music.play();
            document.getElementById("song").innerHTML = "song name = " + second_music;
        }
    }

}

function play()
{
    song.play();
}