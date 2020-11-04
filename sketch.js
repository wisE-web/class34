var newball;
var database,position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    newball = createSprite(250,250,10,10);
    newball.shapeColor = "red";
    var ballpos = database.ref('ball/position');
    ballpos.on("value",readPostion,showError)
}

function draw(){
    background("white");
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

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y,
    })
    }


function readPostion (data) {
    position = data.val();
    newball.x = position.x;
    newball.y = position.y;
}

function showError () {
    console.log("error in reading data from database");
}
