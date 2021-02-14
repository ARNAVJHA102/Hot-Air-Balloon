var ball;
var balloonImage,bg;

function preload() {
    balloonImage = loadImage("Hot Air Ballon-02.png");
    bg = loadImage("Hot Air Ballon-01.png");
}

function setup(){
    database = firebase.database();
    createCanvas(1350,650);
    ball = createSprite(250,250,10,10);
    ball.addImage("b",balloonImage);
    ball.shapeColor = "red";

    
    var ballref = database.ref('balloon/position');

    
    ballref.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
    
function writePosition(x1,y1){
    database.ref('balloon/position').set({
        'x':position.x+x1,
        'y':position.y+y1
    })
}
  
function readPosition(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError() {
    console.log("error");
}
