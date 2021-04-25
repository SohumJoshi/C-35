var ball;               //refers to the VSC
var database;
var position;       //refers to the position in the database
var ballPosition;

function setup() {
    createCanvas(500,500);

    //create the database insinde 'database' --> firebase.database()
    database = firebase.database();

    //create avariable called ballPosition that refers and listens to the database
    //refer --> database.ref('the field to be referred')
    ballPosition = database.ref('ball/position');

    //create a listener fot the database using the same variable --> variableName.on("value",function1 (readPosition),function2 (showError))
    ballPosition.on("value", readPosition, showError);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw() {
    background("white");
    if (keyDown(LEFT_ARROW)) {
        changePosition(-1,0);
    }
    else if (keyDown(RIGHT_ARROW)) {
        changePosition(1,0);
    }
    else if (keyDown(UP_ARROW)) {
        changePosition(0,-1);
    }
    else if (keyDown(DOWN_ARROW)) {
        changePosition(0,+1);
    }
    
    drawSprites();
}


function changePosition(x, y) {
    //refer to the database update the x and y positions of the ball in the database to the current positions of the ball --> .set({})
    database.ref('ball/position').set({
        'x': ballPosition.x + x,
        'y': ballPosition.y + y
    })
 
}

function readPosition(data) {
//to store the listened values inside the ballPosition variable --> variablename = data.val()
    ballPosition = data.val();

//fix the position of the ball from the VSC to the position in the database
    ball.x = ballPosition.x;
    ball.y = ballPosition.y;
}

function showError(){
    console.log("Error in reading/ updating values in the database")
}