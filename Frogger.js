//Variables
let Car1;
let carArray = [];

let Platform1;
let platformArray = [];

let Tiger1;
let cooldown;

//Setup Function
function setup() {
  createCanvas(400, 400);
  //Create tiger and zero out our deltatime
  Tiger1 = new Tiger(200, 380)
  cooldown = 0;
  
  //Create all the cars and platforms
  for(let i = 0; i<= 1; i++){
    Car1 = new Car(-20-(i*200), 220, 1, random(1.3, 1.7))
    carArray.push(Car1)
  }
  for(let i = 0; i<= 2; i++){
    Car1 = new Car(-40-(i*150), 270, 1, random(1.8, 2.2))
    carArray.push(Car1)
  }
  for(let i = 0; i<= 1; i++){
    Car1 = new Car(-80-(i*250), 320, 2, random(1.3, 1.7))
    carArray.push(Car1)
  }
  
  for(let i = 0; i<= 1; i++){
    Platform1 = new Platform(-80-(i*200), 100, 2, random(1.3, 1.7))
    platformArray.push(Platform1)
  }
  
  
}

function draw() {
  background("rgb(100,219,100)");
  
  //Lanes
  fill("lightblue")
  rect(0, 50, 400, 100)
  rect(0, 220, 400, 140)
  
  //Cars
  for(let i = 0; i<=6; i++){
    carArray[i].moveCar()
  }
  
  for(let i = 0; i<=1; i++){
    platformArray[i].movePlatform()
  }
  //Move tiger and check if hitting anything
  Tiger1.movePlayer()
  Tiger1.drawPlayer()
  Tiger1.checkColl()
  
  
}

//Class Car
class Car{
  constructor(x, y, xSize, xSpeed){
    this.x = x
    this.y = y
    this.xSize = xSize
    this.xSpeed = xSpeed
  }
  moveCar(){
    this.x += this.xSpeed;
    if(this.x > width){
      this.x = -40
    }
    
    fill("red")
    rect(this.x, this.y, 40*this.xSize, 40)
  }
}



//Class Platform
class Platform{
  constructor(x, y, xSize, xSpeed){
    this.x = x
    this.y = y
    this.xSize = xSize
    this.xSpeed = xSpeed
  }
  movePlatform(){
    this.x += this.xSpeed;
    if(this.x > width){
      this.x = -40
    }
    
    fill("yellow")
    rect(this.x, this.y-40, 40*this.xSize, 80)
  }
}


//Tiger Class
class Tiger{
  constructor(x, y){
    this.x = x
    this.y = y
  }
  
drawPlayer(){
  push()
  translate(this.x, this.y)
  scale(1.5)
  fill("orange")
  ellipse(8, -7, 7)
  ellipse(-8, -7, 7)
  ellipse(0, 0, 20, 20)
  fill("black")
  stroke("black")
  triangle(0,-7, 3, -10, -3, -10)
  stroke("white")
  ellipse(5, 0, 5)
  ellipse(-5, 0, 5)
  stroke("black")
  fill("brown")
  triangle(0,0, 3, 3, -3, 3)
  arc(0, 5, 3, 6, 0, 180)
  pop()
  }
  //Key Movement
  movePlayer(){
    cooldown += deltaTime
    
    if (keyIsPressed && cooldown > 400) {
      cooldown = 0;
      if (keyCode === LEFT_ARROW) {
        this.x -= 45;
  } else if (keyCode === RIGHT_ARROW) {
        this.x += 45;
      }
      if (keyCode === UP_ARROW) {
        this.y -= 45;
  } else if (keyCode === DOWN_ARROW) {
        this.y += 45;
      }
      
      
    }
  }
  checkColl(){
    //COLISION WITH CARS
    for(let i = 0; i<=carArray.length-1; i++){
      if(dist(this.x, this.y, carArray[i].x, carArray[i].y) < 25) {
        this.x = 200
        this.y = 380
      }
    }
    
    //COLISION WITH NOT PLATFORMS
    for(let i = 0; i<=platformArray.length-1; i++){
      if(dist(this.x, this.y, platformArray[i].x, platformArray[i].y) > 150 && Tiger1.y < 130 && Tiger1.y > 40) {
        this.x = 200
        this.y = 380
      }
    }
    
  }
  
}

