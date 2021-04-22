class Game{
    constructor(){

    }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }

        //creating sprites and assigning them to an array
            player1 = createSprite(200,500);
            player1.addImage("player1",player_img);
        
            player2 = createSprite(800,500);
            player2.addImage("player2", player_img);

            players=[player1,player2];

        }
    
    play(){
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            players[index -1].x = x;
            players[index - 1].y = y;
                       
            if(index === player.index){
                // to display player name on the basket.
                    fill("black");
                    textSize(25);
                    text(allPlayers[plr].name ,x-25,y+25);        
            }
            
            //text to display player score.
                stroke("white");
                strokeWeight(3);
                textSize(15);
                text("Player 1: "+player1score,120,90);
                text("Player 2: "+player2score,120,150);
        }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                        //fill code here, to destroy the objects. (Use the one in the class project 39)
                            fruitGroup.destroyEach();
                        
                        // add the condition to calculate the score. and use update ti update the values in the database.
                            if (fruitGroup.isTouching(player1)) {
                                player1score = player1score+2;
                            } else if (fruitGroup.isTouching(player2)) {
                                player2score = player2score+2;
                            }
                  }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}