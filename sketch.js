//variables for database
  var database;
  var back_img;
  var gameState = 0;
  var playerCount = 0;
  var allPlayers;

//variables used in code   
  var player, form,game;
  var player1,player2;
  var players;
  var fruits;
  var fruitGroup;
  var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
  var player_img;

// create the variables for the score and displaying scores. and intialize with zero
  var player1score = 0;
  var player2score = 0;

function preload(){
  //loading images and assigning them to appropriate variables
    back_img = loadImage("images/jungle.jpg");
    player_img = loadImage("images/basket2.png");
    fruit1_img = loadImage("images/apple2.png");
    fruit2_img = loadImage("images/banana2.png");
    fruit3_img = loadImage("images/melon2.png");
    fruit4_img = loadImage("images/orange2.png");
    fruit5_img = loadImage("images/pineapple2.png");

  //creating a fruit group for fruits  
    fruitGroup = new Group();
}

function setup() {
  //creating canvas
    createCanvas(1000, 600);

  //initialising database  
    database = firebase.database();
  
  //new game  
    game = new Game();

  //calling game class functions
    game.getState();
    game.start();
}

function draw() {
  //assigning background image
    background(back_img);

  //conditions for gameStates
    if (playerCount === 2) {
      game.update(1);
    }
    if (gameState === 1) {
      clear(); 
      game.play();
    }
    if (gameState === 2) {
      
      game.end();
    }
}