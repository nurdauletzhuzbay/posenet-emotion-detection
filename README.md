# posenet-emotion-detection
## emotion detection from body postures
This project uses ML trained library called PoseNet and it detects 3 emotions from human poses. Scary, happy, disgusted and if pose will not fit each of these emotions, it will output garbage emotion. Main code is in sketch.js file. ...min.js libraries are important do not delete them. In the index.html file you can specify the sizes, colors of the window where emotions will be shown
Emotion detector works in such a way, that it measures the angle of hands and if they are above the nose it returns happy. And so on ...
![This is an image](https://github.com/nurdauletzhuzbay/posenet-emotion-detection/blob/main/posenet_happy.png)
