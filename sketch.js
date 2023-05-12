    var PLAY=1;
    var END=0;
    var gameState=1;

    var fruitGroup,fruit1,fruit2,fruit3,fruit4;

    
    var enemy,alienGroup,alien1,alien2;

    
    var knife;

    var gameOverImg;

    var background;

    var score;

    var gameoverSound,knifeSound;

    function preload(){

      enemy=loadAnimation("alien1.png","alien2.png");


      fruit1Img=loadImage("fruit1.png");
      fruit2Img=loadImage("fruit2.png");
      fruit3Img=loadImage("fruit3.png");
      fruit4Img=loadImage("fruit4.png");
      knifeImg=loadImage("knife.png");
      gameOverImg=loadImage("gameover.jpeg");

      gameoverSound=loadSound("gameover.mp3");
      knifeSound=loadSound("knifeSwooshSound2.mp3");
    }

    function setup(){

      createCanvas(600,600);

      knife=createSprite(120,200,10,10);
      knife.addImage(knifeImg);
      knife.scale=0.5;
      knife.scale=0.5;
      knife.setCollider("circle",0,0,40);
      knife.debug=false;

      fruitGroup=createGroup();
      alienGroup=createGroup();


      score=0;
    }


    function draw(){
      background("violet");

      text("SCORE:"+ score,520,30);

       if(gameState===PLAY){

      Fruit();
      ALIENS();

      knife.y=World.mouseY;
      knife.x=World.mouseX;

      if(fruitGroup.isTouching(knife)){
        fruitGroup.destroyEach();
        score=score+2;
        knifeSound.play();
       }

      }  


       if(alienGroup.isTouching(knife)){
        alienGroup.destroyEach();
        fruitGroup.destroyEach(); 
        gameState = END;
        alienGroup.velocityX=0;
        fruitGroup.velocityX=0;
        knife.addImage(gameOverImg);
        knife.scale=1; 
        knife.x=300;
        knife.y=300;
        gameoverSound.play(); 
       }

      if(keyDown("space") && gameState===END){
        gameState=1;
        knife.addImage(knifeImg);
        knife.scale=0.5;
        score=0;
      }


      if(gameState===END){
        text("PRESS SPACE TO RESTART",220,350);
      }


      drawSprites();
    }

    function Fruit(){
      if(World.frameCount % 80===0){
        fruit=createSprite(500,200,20,20);
        fruit.scale=0.2;
        rand=Math.round(random(1,4));
              if(rand==1){
          fruit.addImage(fruit1Img);
        }else if(rand==2){
          fruit.addImage(fruit2Img);
        }else if(rand==3){
          fruit.addImage(fruit3Img);
        }else if(rand==4){
          fruit.addImage(fruit4Img);
        }

        fruit.y=Math.round(random(50,450));
        fruit.velocityX=-(8+score/10);
        fruit.setLifetime=100;

        fruitGroup.add(fruit);
      }
    }


    function ALIENS(){
      if(World.frameCount%200===0){
        alien=createSprite(500,100,20,20);
        alien.addAnimation("enemyA",enemy);
        alien.velocityX=-(8+score/10);
        alien.setLifetime=50;

        alienGroup.add(alien);

      }
    }
