var database
var dog,happyDog,dogImage
var foodS,foodStock
var foodObj
var feed,addFood
var fedTime,lastFed

function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database()
	createCanvas(1200, 500);

  foodObj=new Food();

  dog = createSprite(200,400)
  dog.addImage(dogImage)
  dog.scale=0.2 

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods); 
  
}


function draw() {  
  background(245, 212, 66)

  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  foodObj.display()

  drawSprites();
  
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




