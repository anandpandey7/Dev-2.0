enum Direction {
    Up,
    Down,
    Left,
    Right
} 

function doSomething(keyPressed : Direction){
    if(keyPressed == Direction.Up){
        console.log("Up");
    }
    if(keyPressed == Direction.Down){
        console.log("Down");
    }
}

doSomething(Direction.Down);
doSomething(Direction.Up);