class Game {
   constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");

      this.leadeboardTitle = createElement("h2");

   }

   getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function (data) {
         gameState = data.val();
      });
   }
   update(state) {
      database.ref("/").update({
         gameState: state
      });
   }

   start() {
      player = new Player();
      playerCount = player.getCount();

      form = new Form();
      form.display();

      redGhost = createSprite(width / 2 - 50, height - 100);
      redGhost.addImage("ghost", redGhost_img);
      redGhost.scale = 0.07;

//kggg
      yellowGhost = createSprite(width / 2 + 100, height - 100);
      yellowGhost.addImage("ghost",yellowGhost_img);
      yellowGhost.scale = 0.07;
     

// kggg
      greenGhost = createSprite(width / 2 + 100, height - 100);
      greenGhost.addImage("ghost",greenGhost_img);
      greenGhost.scale = 0.07;
      ghost = [redGhost, yellowGhost, greenGhost, pinkGhost]


      
      powerBalls = new Group();
   


    
   
      // Adding fuel sprite in the game
      this.addSprites(powerBalls, 4, powerBalls_img, 0.02);

      // Adding coin sprite in the game
      // this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

      //Adding obstacles sprite in the game



      this.addSprites(
         obstacle1,
         obstacle1Positions.length,
         obstacle1Image,
         0.04,
         obstacle1Positions
      );
      this.addSprites(
         obstacle2,
         obstacle2Positions.length,
         obstacle2Image,
         0.04,
         obstacle2Positions
      );
   }

   //C41 //SA
   addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
      for (var i = 0; i < numberOfSprites; i++) {
         var x, y;

         //C41 //SA
         if (positions.length > 0) {
            x = positions[i].x;
            y = positions[i].y;
            spriteImage = positions[i].image;
         } else {
            x = random(width / 2 + 150, width / 2 - 150);
            y = random(-height * 4.5, height - 400);
         }
         var sprite = createSprite(x, y);
         sprite.addImage("sprite", spriteImage);

         sprite.scale = scale;
         spriteGroup.add(sprite);
      }
   }

   handleElements() {
      form.hide();
      form.titleImg.position(40, 50);
      form.titleImg.class("gameTitleAfterEffect");

      this.resetTitle.html("Reset Game");
      this.resetTitle.class("resetText");
      this.resetTitle.position(width / 2 + 200, 40);

      this.resetButton.class("resetButton");
      this.resetButton.position(width / 2 + 230, 100);
   }

   play() {
      this.handleElements();
      this.handleResetButton();

      Player.getPlayersInfo();
      player.getCarsAtEnd();

      if (allPlayers !== undefined) {
         image(ground_img, 0, -height * 5, width, height * 6);

        
       

         //index of the array
         var index = 0;
         for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;

            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;

            var currentlife = allPlayers[plr].life;

            if (currentlife <= 0) {
               cars[index - 1].changeImage("blast");
               cars[index - 1].scale = 0.3;
            }


            cars[index - 1].position.x = x;
            cars[index - 1].position.y = y;

            //to check the active player
            if (index === player.index) {
               stroke(10);
               fill("red");
               ellipse(x, y, 60, 60);

               this.handleFuel(index);
               this.handlePowerCoins(index);
               this.handleObstacleCollision(index); //C41//SA

               if (player.life <= 0) {
                  this.blast = true;
                  this.playerMoving = false;
               }

               // Changing camera position in y direction
               camera.position.y = cars[index - 1].position.y;
            }
         }          

         if (this.playerMoving) {
            player.positionY += 5;
            player.update();
         }

         // handling keyboard events
         this.handlePlayerControls();

         // Finshing Line
         const finshLine = height * 6 - 100;

         if (player.positionY > finshLine) {
            gameState = 2;
            player.rank += 1;
            Player.updateCarsAtEnd(player.rank);
            player.update();
            this.showRank();
         }

         drawSprites();
      }
   }

   handleFuel(index) {
      // Adding fuel
      cars[index - 1].overlap(fuels, function (collector, collected) {
         player.fuel = 185;
         //collected is the sprite in the group collectibles that triggered
         //the event
         collected.remove();
      });

      // Reducing Player car fuel
      if (player.fuel > 0 && this.playerMoving) {
         player.fuel -= 0.3;
      }

      if (player.fuel <= 0) {
         gameState = 2;
         this.gameOver();
      }
   }

   handlePowerCoins(index) {
      cars[index - 1].overlap(powerCoins, function (collector, collected) {
         player.score += 21;
         player.update();
         //collected is the sprite in the group collectibles that triggered
         //the event
         collected.remove();
      });
   }

   handleResetButton() {
      this.resetButton.mousePressed(() => {
         database.ref("/").set({
            carsAtEnd: 0,
            playerCount: 0,
            gameState: 0,
            palyers: {}
         });
         window.location.reload();
      });
   }

   showFuelBar() {
      push();
      image(fuelImage, width / 2 - 130, height - player.positionY - 300, 20, 20);
      fill("white");
      rect(width / 2 - 100, height - player.positionY - 300, 185, 20);
      fill("#ffc400");
      rect(width / 2 - 100, height - player.positionY - 300, player.fuel, 20);
      noStroke();
      pop();
   }

   showLife() {
      push();
      image(lifeImage, width / 2 - 130, height - player.positionY - 250, 20, 20);
      fill("white");
      rect(width / 2 - 100, height - player.positionY - 250, 185, 20);
      fill("#f50057");
      rect(width / 2 - 100, height - player.positionY - 250, player.life, 20);
      noStroke();
      pop();
   }

   

     

      

   handlePlayerControls() {
      // blast is not happening
      if (!this.blast) {
         if (keyIsDown(UP_ARROW)) {
            this.playerMoving = true;
            player.positionY += 10;
            player.update();
         }

         if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
            this.leftKeyActive = true;
            player.positionX -= 5;
            player.update();
         }

         if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
            this.leftKeyActive = false;
            player.positionX += 5;
            player.update();
         }
      }
   }

   //C41 //SA
   handleObstacleCollision(index) {
      if (cars[index - 1].collide(obstacle1) || cars[index - 1].collide(obstacle2)) {      //C41 //TA
         if (this.leftKeyActive) {
            player.positionX += 100;
         } else {
            player.positionX -= 100;
         }

         //C41 //SA
         //Reducing Player Life
         if (player.life > 0) {
            player.life -= 185 / 4;
         }

         player.update();
      }
   }

   showRank() {
      swal({
         title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
         text: "You reached the finish line successfully",
         imageUrl:
            "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
         imageSize: "100x100",
         confirmButtonText: "Ok"
      });
   }

   gameOver() {
      swal({
         title: `Game Over`,
         text: "Oops you lost the race....!!!",
         imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
         imageSize: "100x100",
         confirmButtonText: "Thanks For Playing"
      });
   }
}
