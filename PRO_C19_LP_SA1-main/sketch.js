var invisibleBlockGroup, invisibleBlock;
var slope,slopeImg;
var skierGif, skierRightImg;
var skier, skierImg;
var treeImg, tree;
var ground;
var flags, flagImg;
var skierRight, skierLeft;
var star,starsImg;
var treeGroup;
var gameState = "play";
var score;
var snowman, snowmanImg;
var snowmanGroup;
function preload(){
  slopeImg = loadImage("skislope.jpg");
  skierLeft = loadAnimation("skicharacters2.png","skicharacters4.png","skicharacters5.png","skicharacters6.png");
  skierRight = loadAnimation("skicharacters.png", "skicharacters1.png","skicharacters3.png");
  skierImg = loadImage("skicharacters6.png");
  treeImg = loadImage("tree.png");
  starsImg = loadImage("stars.png");
  snowmanImg = loadImage("snowman.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  skier = createSprite(width/2,height - 800);
  skier.scale = 0.7;
  skier.addAnimation("skiRight",skierRight);
  skier.addAnimation("skiLeft",skierLeft);
  skier.addImage("skiImg",skierImg);

  star = createSprite(skier.x,skier.y - 60, 10,10);
  star.scale = 0.25;
  star.addImage("knockout",starsImg);
  star.visible = false;

  snowmanGroup = new Group();
  treeGroup = new Group();

  ground = createSprite(width/2,height - 600, 500,height + 700);
  ground.velocityY = -5;
  ground.shapeColor = "white";
  ground.depth = skier.depth;
  skier.depth += 1;

  score = 0;
 
}

function draw() {
  background("green");
  if(ground.y < height - 800){
      ground.y = height - 600;
    }
    
  drawSprites();

  if(gameState == "play") {
    console.log(skier.x + ("skier"));
    
    if(frameCount % 100 == 0) {
      score = score+5;
    }
    textSize(25);
    text("Score:" + score, 975,25);
    spawnTrees();
    spawnSnowman();
    if (keyDown(LEFT_ARROW) && skier.x > 650) {
      skier.changeAnimation("skiLeft",skierLeft);
      skier.x -= 10;
      star.x = skier.x;
    }  
    
    if (keyDown(RIGHT_ARROW) && skier.x < 1020) {
      skier.changeAnimation("skiRight",skierRight);
      skier.x += 10;
      star.x = skier.x;
    }
  
    if(skier.isTouching(treeGroup)) {
      gameState = "end";
      star.visible = true;
      star.x = skier.x - 7;
    }

    if(skier.isTouching(snowmanGroup)) {
      gameState = "end";
      star.visible = true;
      star.x = skier.x - 7;
    }
    
  }
  else if(gameState == "end") {
    treeGroup.setVelocityYEach(0);
    treeGroup.destroyEach();

    snowmanGroup.setVelocityYEach(0);
    snowmanGroup.destroyEach();
    
    skier.changeImage("skiImg",skierImg);

    textSize(50);
    text("Game Over", 720, 350)
    textSize(30);
    text("Press space to play again", 675, 450);
  }

  
console.log(gameState);



}



function spawnTrees() {

  if (frameCount % 80 == 0) {
    var x = Math.round(random(620, 1050));
    tree = createSprite(x,height + 200, 15,30);
    tree.scale = 0.3;
    tree.addImage("tree",treeImg);
    tree.velocityY = -(7 + score/100);
    console.log(tree.velocityY);
    console.log(tree.x);
    treeGroup.add(tree);
    tree.lifetime = 200;
  }
}

function spawnSnowman() {
  if (frameCount % 300 == 0) {
    var x = Math.round(random(610,1000));
    snowman = createSprite(x,height + 200,15,30);
    snowman.scale = 0.2;
    snowman.addImage("snowman",snowmanImg);
    snowman.velocityY = -(7 + score/100);
    snowmanGroup.add(snowman);
    snowman.lifetime = 300;
  }
}
