var bird, birdImg;
var blockdown;
var blockup;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score;

function preload(){

 birdImg = loadAnimation("images/birdImg1.png","images/birdImg2.png","images/birdImg3.png","images/birdImg2.png");
 blockdown = loadImage("images/blockdown.png");
 blockup = loadImage("images/blockup.png");

}

function setup() {
  createCanvas(windowWidth - 20,windowHeight - 20);

  bird = createSprite(650, 200, 50, 50);
  bird.addAnimation("bird",birdImg);
  bird.setCollider("circle",0,0,bird.width/5);
  
  bird.scale = 0.2;
  //bird.debug=true;
  
  
  blockG = new Group();
  block2G = new Group();
 

  score = 0;
  
}

function draw() {
  background("skyblue");  

  drawSprites();
  if(gameState===PLAY){

   edges = createEdgeSprites();
   bird.collide(edges);
   
   if(keyDown("space")){
     bird.velocityY = -10;
    }

    if(frameCount%135 === 0 && frameCount > 135){
      score = score + 10;
    }

   spawnblocks();
   

   bird.velocityY = bird.velocityY + 0.8

   if(blockG.isTouching(bird)){
    gameState = END;
  }

  if(block2G.isTouching(bird)){
    gameState = END;
  }

  textSize(25);
  fill("black");
  text("Score: "+ score, 50,50);

  }

 
  else if(gameState === END){

    bird.velocityY = 0;

    blockG.setVelocityXEach(0);
    block2G.setVelocityXEach(0);
 

    blockG.setLifetimeEach(-1);
    block2G.setLifetimeEach(-1);

    bird.changeAnimation("bird",birdImg)
    

    textSize(50);
    fill('cyan');
    stroke('black');
    strokeWeight(3);
    text('Game Over',windowWidth/2-130,windowHeight/2)
  }

}

function spawnblocks(){

 if(frameCount%100 === 0){

   var block = createSprite(windowWidth, windowHeight - 100,150,300);
    block.velocityX = -7;
    block.height = random(200,450); 
    block.setCollider("rectangle" ,0,0,block.width,block.height);
    block.lifetime = 600;
    block.shapeColor = color(random(0,255),random(0,255),random(0,255));
    blockG.add(block);
    block.depth = 2;
    //block.debug=true;
  }
    
  if(frameCount%100 === 0){
 
    var block2 = createSprite(windowWidth, 100, 150, 300);
    block2.velocityX = -7;
    block2.height = random(200,450); 
    block2.setCollider("rectangle" ,0,0,block2.width,block2.height);
    block2.lifetime = 600;
    block2.shapeColor = color(random(0,255),random(0,255),random(0,255));
    block2G.add(block2);
    block2.depth = 2;
    //block2.debug=true;
      
  }
}
