
var backgroundImage;
var redGhost, greenGhost, yellowGhost,pinkGhost;
var player;
var game;
var form;
var redGhost_img,yellowGhost_img,pinkGhost_img,greenGhost_img;
var powerBalls,powerBalls_img
var ground , ground_img;
function preload(){
backgroundImage = loadImage("assets/background .jpg")
redGhost_img = loadImage ("assets/red ghost.png");
greenGhost_img = loadImage("assests/green ghost.png");
yellowGhost_img = loadImage("assests/yello.png")
pinkGhost_img = loadImage ("assests/Pinky.webp")
powerBalls_img = loadImage("assets/power balls.png")
ground_img = loadImage("assets/ground.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
 game = new Game ()
 game.start()
}

function draw() {
  background(backgroundImage);

}
