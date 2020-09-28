var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud_running
var obstacle_running, obstacle_running2, obstacle_running3, obstacle_running4, obstacle_running4, obstacle_running5, obstacle_running6;
var gameOverimage, gameover
var restartimage, restart
var score = 0
var cloudGroup, obstacleGroup;
var gameState = "play";


function preload() {
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloud_running = loadImage("cloud.png");

  obstacle_running = loadImage("obstacle1.png")
  obstacle_running2 = loadImage("obstacle2.png")
  obstacle_running3 = loadImage("obstacle3.png")
  obstacle_running4 = loadImage("obstacle4.png")
  obstacle_running5 = loadImage("obstacle5.png")
  obstacle_running6 = loadImage("obstacle6.png")

  gameOverimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
}

function setup() {
  background(220)
  createCanvas(600, 200)
  //game over animation
  gameover = createSprite(300, 100)
  gameover.addImage("gameover", gameOverimage)
  gameover.visible = false;
  gameover.scale = 2
  // restart animation
  restart = createSprite(350, 120)
  restart.addImage("restart", restartimage)
  restart.scale = 0.5
  restart.visible = false

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;


  //creating invisible ground
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloudGroup = new Group();
  obstacleGroup = new Group();


}

function draw() {
  //set background color
  background(180);
  text(score, 500, 50)


  trex.setCollider("circle", 0, 0, 40)
  if (gameState == "play") {
    ground.velocityX = -4;
    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8
    //Spawn Clouds
    spawnClouds()
    spawnObstacles()
    score = score + 1
    if (trex.isTouching(obstacleGroup)) {
      gameState = "end"
      gameover.visible = true;
      restart.visible = true;
      

    }

  } else {
    // game state end
    trex.changeAnimation("collided", trex_collided)
    ground.velocityX = 0
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    if (mousePressedOver(restart)){
    gameState="play"
    gameover.visible=false
    restart.visible=false
    trex.changeAnimation("running",trex_running)
    cloudGroup.setLifetimeEach(0)
    obstacleGroup.setLifetimeEach(0)
    score=0
    }
  }

  //stop trex from falling down
  trex.collide(invisibleGround);


  drawSprites();
}

//function to spawn the clouds
function spawnClouds() {
  // write your code here
  if (frameCount % 100 == 0) {
    var a = random(80, 110)
    a = Math.round(a)
    // console.log(a)
    var cloud = createSprite(600, a)
    cloud.addImage("cloud", cloud_running)
    cloud.velocityX = -4
    cloud.scale = 0.75
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloud.lifetime = 600 / 4
    cloudGroup.add(cloud);

  }
}

function spawnObstacles() {
  if (frameCount % 150 == 0) {
    var s = random(1, 6)
    s = Math.round(s)
    var obstacle = createSprite(580, 160)
    if (s == 1) {
      obstacle.addImage("obstacle", obstacle_running)
    }
    if (s == 2) {
      obstacle.addImage("obstacle", obstacle_running2)
    }
    if (s == 3) {
      obstacle.addImage("obstacle", obstacle_running3)
    }
    if (s == 4) {
      obstacle.addImage("obstacle", obstacle_running4)
    }
    if (s == 5) {
      obstacle.addImage("obstacle", obstacle_running5)
    }
    if (s == 6) {
      obstacle.addImage("obstacle", obstacle_running6)
    }

    obstacle.velocityX = -2
    obstacle.scale = 0.75
    obstacle.lifetime = 600 / 2
    obstacleGroup.add(obstacle);
  }
}