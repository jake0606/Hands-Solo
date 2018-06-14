//setup the canvas
var canvas = document.getElementById("solo");
var ctx = canvas.getContext("2d");
canvas.style.border = "3px dotted "+getColour();
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1024, 768); //black bg for entire game;
ctx.font = "bold 50px Arial";
ctx.fillStyle = getColour();
ctx.fillText("Loading...",370,350);
var gameState = 'm' //variable to control game screens
var circleTimer; var handTimer; var secondTimer; var txtTimer; //timers
var userName; //for highscores
var heading = "Hands Solo"; //screen heading
var headingY = 350;

//AUDIO STUFF
var soundTrack = new Audio();
var sfx = new Audio();
var audio = "Mute Audio";
var soundList = ["Assets/Audio/handssolo-track.wav","Assets/Audio/handssolo.wav","Assets/Audio/handssolo-win-1.wav","Assets/Audio/highPoints.wav","Assets/Audio/lowPoints.wav","Assets/Audio/duffPoints.wav","Assets/Audio/lose-1.wav","Assets/Audio/lose-2.wav"];
function init(){
    for (var i in soundList) {
        preloadAudio(soundList[i]);
    }
}
function preloadAudio(url){
    var a = new Audio();
    a.addEventListener('canplaythrough',loadedAudio);
    a.src = url;
}
var numAudio = 0;
function loadedAudio(){
    numAudio++;
    if(numAudio == soundList.length){
        soundTrack.src = soundList[0];
        for (var i in imgPaths) {
            preloadImg(imgPaths[i]);
        }
    }
}
//IMAGE STUFF
var leftHand = new Image();
var rightHand = new Image();
var lFillStyle = "rgb(255,255,255)";
var rFillStyle = "rgb(255,255,255)";
var tintL; var tintR;
var imgPaths = ["Assets/Img/lhand.png","Assets/Img/rHand.png"];
function preloadImg(url){
    var img = new Image();
    img.addEventListener('load',loadedImg);
    img.src = url;
}
var numImg = 0
function loadedImg(){
    numImg++;
    if(numImg == imgPaths.length){
        leftHand.src = imgPaths[0];
        rightHand.src = imgPaths[1];
        //init first tint
        tintL = imgdye(leftHand, lFillStyle, 0.5);
        tintR = imgdye(rightHand, rFillStyle, 0.5);
        playSFX(1);
        drawScreens();
    }
}
//DRAW THE SCREEN
function drawScreens(){
    ctx.clearRect(0,0, 1024, 768);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1024, 768); //black bg for entire game;
    if(gameState=='m'){
        drawTitle(heading,headingY);
        txtTimer = setInterval(drawTitle, 500, heading, headingY);
        ctx.font = "20px MainTxt";
        ctx.drawImage(tintL, 180, 280, 60, 60);
        ctx.drawImage(tintR, 740, 280, 60, 60);
        ctx.fillStyle = "white";
        ctx.fillText("Hit P to Play",10,690);
        ctx.fillText("Hit M to "+audio,850,750);
        ctx.fillStyle = "rgb(34,141,255)";
        ctx.fillText("Hit H for Highscores",10,720);
        ctx.fillStyle = "rgb(255,0,102)";
        ctx.fillText("Hit I for Instructions",10,750);
        
    }
    if(gameState=='g'){
        drawTitle(heading,headingY);
        txtTimer = setInterval(drawTitle, 500, heading, headingY);
        ctx.fillStyle = "white";
        ctx.font = "30px 'SmallTxt'";
        ctx.fillText("Your Score: "+score,310,350);
        ctx.fillText("Your Highscore: "+hScore,310,390);
        ctx.font = "24px MainTxt";
        ctx.fillText("Hit E to Submit Your Highscore",310,460);
        ctx.font = "20px MainTxt";
        ctx.fillStyle = "white";
        ctx.fillText("Hit P to Play",10,660);
        ctx.fillText("Hit M to "+audio,850,750);
        ctx.fillStyle = "rgb(34,141,255)";
        ctx.fillText("Hit H for Highscores",10,690);
        ctx.fillStyle = "rgb(255,0,102)";
        ctx.fillText("Hit I for Instructions",10,720);
        ctx.fillStyle = "rgb(182,255,0)";
        ctx.fillText("Hit ESC for Menu",10,750);
        
    }
    if(gameState=='h'){
        drawTitle(heading,headingY);
        txtTimer = setInterval(drawTitle, 500, heading, headingY);
        ctx.fillStyle = "white";
        ctx.font = "30px 'SmallTxt'";
        if(scores[0] == "Highscores unavailable"){
            ctx.fillText("Highscores unavailable",330,335);
        }else{
            for (var i = 1; i < scores.length+1; i++){
                ctx.fillText(""+i+": "+scores[i-1],330,300+(35*i));
                if(i > 4)break;
            } 
        }
        ctx.font = "24px MainTxt";
        ctx.fillStyle = "white";
        ctx.fillText("Your highscore: "+hScore+" -- Hit E to Submit",300,550);
        ctx.font = "20px MainTxt";
        ctx.fillText("Hit P to Play",10,660);
        ctx.fillText("Hit M to "+audio,850,750);
        ctx.fillStyle = "rgb(34,141,255)";
        ctx.fillText("Hit H for Highscores",10,690);
        ctx.fillStyle = "rgb(255,0,102)";
        ctx.fillText("Hit I for Instructions",10,720);
        ctx.fillStyle = "rgb(182,255,0)";
        ctx.fillText("Hit ESC for Menu",10,750);
        
    }
    if(gameState=='s'){
        drawTitle(heading,headingY);
        txtTimer = setInterval(drawTitle, 500, heading, headingY);
        ctx.fillStyle = "white";
        ctx.font = "30px 'SmallTxt'";
        console.log("username is "+userName);
        ctx.fillText("Name: "+userName,310,400);
        ctx.font = "20px MainTxt";
        ctx.fillStyle = "white";
        ctx.fillText("Alphanumeric characters only! Max 15 Chars! Hit Enter When Done",250,315);
        ctx.fillStyle = "white";
        ctx.fillText("Hit M to "+audio,850,750);
        ctx.fillText("Hit ESC for Menu",10,750);
    }
    if(gameState=='i'){
        drawTitle(heading,headingY);
        txtTimer = setInterval(drawTitle, 500, heading, headingY);
        ctx.fillStyle = "white";
        ctx.font = "30px 'SmallTxt'";
        ctx.fillText("• W,A,S,D to control your left hand",20,370);
        ctx.fillText("• Arrow keys to control your right hand",20,420);
        ctx.fillText("• Collect the coloured balls but only if they match the colour of your hand",20,470);
        ctx.font = "20px MainTxt";
        ctx.fillStyle = "white";
        ctx.fillText("Hit P to Play",10,720);
        ctx.fillText("Hit M to "+audio,850,750);
        ctx.fillStyle = "rgb(34,141,255)";
        ctx.fillText("Hit ESC for Menu",10,750);
    }
    if(gameState=='p'){
        gameLoop();
        generateCircles();
    }
}

function drawTitle(title, yPos){
    ctx.fillStyle = "black";
    if(yPos==350) ctx.fillRect(245, 240, 490, 150);
    else ctx.fillRect(245, 140, 490, 150);
    ctx.font = "bold 100px 'MainTxt'";
    ctx.fillStyle = getColour();
    ctx.fillText(title,280,yPos);
}
//MAIN GAME STUFF
var score = 0, lives = 5; var seconds = 30;
var hScore = localStorage.getItem("highscore");
if(hScore == null){
    localStorage.setItem("highscore", score);
}else{
    hScore = localStorage.getItem("highscore");
}
var lhX = 200, lhY = 350, rhX = 800, rhY = 350;
var lUp = false, lDown = false, lLeft = false, lRight = false;
var rUp = false, rDown = false, rLeft = false, rRight = false;
//returns colour for circles and hand switching
function getColour(){
    c = Math.floor(Math.random()*4)+1;
    var colour;
    if(c==1) colour = "rgb(255,0,102)";
    else if(c==2) colour = "rgb(34,141,255)";
    else if(c==3) colour = "rgb(182,255,0)";
    else if(c==4) colour = "rgb(255,255,255)";
    return colour;
}
//circles class
var circles = [];
class Circle{
    constructor(){
        this.x = Math.floor(Math.random()*1010)+10;
        this.y = -30;
        this.radius = Math.floor(Math.random()*20)+5;
        this.fillStyle = getColour();
    }
    update(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        var speed;
        if(this.radius < 10) speed = 7;
        if(this.radis > 9 && this.radius < 15) speed = 5;
        else if(this.radius > 14) speed = 3;
        this.y += speed;
    }
}
function generateCircles(){
    circles.push(new Circle());
}
//switch hand colour
function switchHands(){
    var rand = Math.floor(Math.random()*16)+1;
    if(rand>=1&&rand<=4)lFillStyle = getColour();
    else if(rand>=5&&rand<=8)rFillStyle = getColour();
    tintL = imgdye(leftHand, lFillStyle, 0.5);
    tintR = imgdye(rightHand, rFillStyle, 0.5);
}
//game loop
function gameLoop(){
    if(gameState=='p'){
        ctx.clearRect(0,0,1024,768);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1024, 768); //black bg for entire game;
        ctx.font = "25px 'SmallTxt'";
        ctx.fillStyle = "white";
        ctx.fillText("Score: "+score+"      Lives: "+lives+"      Seconds: "+seconds,10,30);
        ctx.fillStyle = "white";
        ctx.font = "25px 'MainTxt'";
        ctx.fillText("Hit ESC to exit",10,750);
        ctx.font = "20px 'MainTxt'";
        ctx.fillText("Hit M to "+audio,850,750);
        ctx.drawImage(tintL,lhX, lhY, 60, 60);
        ctx.drawImage(tintR,rhX, rhY, 60, 60);
        for(i = 0; i < circles.length; i++){
            circles[i].update();
            if(circles[i].x > lhX-10 && circles[i].x < lhX+60 && circles[i].y > lhY-10 && circles[i].y < lhY+60){
                if(circles[i].fillStyle == lFillStyle){
                    score += Math.floor(100/circles[i].radius)*2;
                    seconds += 5;
                    playSFX(4);
                }else{
                    lives--;
                    playSFX(5);
                }
                circles.splice(i, 1);  
            }else if(circles[i].x > rhX-10 && circles[i].x < rhX+60 && circles[i].y > rhY-10 && circles[i].y < rhY+60){
                if(circles[i].fillStyle == rFillStyle){
                    score += Math.floor(100/circles[i].radius)*2;
                    seconds += 5;
                    playSFX(4);
                }else{
                    lives--;
                    playSFX(5);
                }
                circles.splice(i, 1);
            }else if(circles[i].y > 768){
                circles.splice(i, 1);
            }
        }
        if(lives<1 || seconds < 1){
            if(score > hScore){
                localStorage.setItem("highscore", score);
                hScore = score;
                playSFX(2);
            }else{
               var r = Math.floor(Math.random()*2)+1;
                if(r==1) playSFX(6);
                else if(r==2) playSFX(7); 
            }
            exitGame('g', 'Game Over', 250);
        }else{
            handleControls();
            requestAnimationFrame(gameLoop);
        }
    }
}
function playSFX(index){
    sfx.src = soundList[index];
    sfx.pause();
    sfx.currentTime = 0;
    sfx.play();
}

function exitGame(state, head, yPos){
    heading = head; headingY = yPos;
    gameState = state;
    circles = [];
    clearInterval(circleTimer);
    clearInterval(handTimer);
    clearInterval(secondTimer)
    cancelAnimationFrame(gameLoop);
    lUp = false, lDown = false, lLeft = false, lRight = false;
    rUp = false, rDown = false, rLeft = false, rRight = false;
    soundTrack.pause();
    drawScreens();
}

//CONTROLS

window.addEventListener("keydown", keyDown);
function keyDown(e){
    //playing
    if(gameState=='p'){
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
        //LEFT HAND
        if(e.keyCode==87)//w
            lUp = true;
        if(e.keyCode==83)//s
            lDown = true;
        if(e.keyCode==65)//a
            lLeft = true;
        if(e.keyCode==68)//d
            lRight = true;
        //RIGHT HAND
        if(e.keyCode==38)//up arrow
            rUp = true;
        if(e.keyCode==40)//down arrow
            rDown = true;
        if(e.keyCode==37)//left arrow
            rLeft = true;
        if(e.keyCode==39)//right arrow
            rRight = true;
    }
    
}
window.addEventListener("keyup", keyUp);
function keyUp(e){
     //menu
    if(gameState=='m'||gameState=='i'|| gameState == 'g' || gameState == 'h'){
        if(e.keyCode==80){
            clearInterval(txtTimer);
            gameState = 'p';
            ctx.clearRect(0,0, 1024, 768);
            seconds = 30; score = 0; lives = 5;
            handTimer = setInterval(switchHands, 500);
            secondTimer = setInterval(function(){
                seconds--;
            }, 1000);
            circleTimer = setInterval(generateCircles, 750);
            drawScreens();
            soundTrack.loop = true;
            soundTrack.currentTime = 0;
            soundTrack.play();
            
        }
        if(e.keyCode==73){
            clearInterval(txtTimer);
            gameState = 'i';
            heading = "How To Play"; headingY = 250;
            drawScreens();
        }
        if(e.keyCode==72){
            getScores();
            clearInterval(txtTimer);
        }
        if(e.keyCode==27){
            if(gameState != 'm'){
                clearInterval(txtTimer);
                gameState = 'm';
                heading = "Hands Solo"; headingY = 350;
                drawScreens();
                
            }
        }
        if(e.keyCode==69){
            if(gameState=='h'||gameState=='g'){
                clearInterval(txtTimer);
                gameState = 's';
                heading = "Enter Name"; headingY = 250;
                userName = "";
                drawScreens();
                setTimeout(function(){
                    userName = "";
                    clearInterval(txtTimer);
                    drawScreens();
                }, 10);
            }
        }
    }
    if(e.keyCode==77){
        if(audio=="Mute Audio"){
            audio="Unmute Audio";
            clearInterval(txtTimer);
            drawScreens();
            soundTrack.volume = 0;
            sfx.volume = 0;
        }else{
            audio="Mute Audio";
            clearInterval(txtTimer);
            drawScreens();
            soundTrack.volume = 1;
            sfx.volume = 1;
        }
    }
    if(gameState=='s'){
        if (!(e.keyCode > 47 && e.keyCode < 58) && // numeric (0-9)
        !(e.keyCode > 64 && e.keyCode < 91) && // upper alpha (A-Z)
        !(e.keyCode > 96 && e.keyCode < 123)) { // lower alpha (a-z)
            if(e.keyCode == 8){
                userName = userName.slice(0, -1);
                clearInterval(txtTimer);
                drawScreens();
            }else if(e.keyCode == 13){
                submitHighScore(userName, hScore);
                gameState = 'm';
                heading = "Hand Solo"; headingY = 350;
                clearInterval(txtTimer);
                drawScreens();
            }else if(e.keyCode == 27){
                userName = "";
                gameState = 'h';
                heading = "Highscores"; headingY = 250;
                clearInterval(txtTimer);
                drawScreens();
            }
        }else{
            if(userName.length < 15){
                userName = userName+String.fromCharCode(e.keyCode);
                clearInterval(txtTimer);
                drawScreens();
            }
        }
    }
    //playing
    if(gameState=='p'){
        //LEFT HAND
        if(e.keyCode==87)//w
            lUp = false;
        if(e.keyCode==83)//s
            lDown = false;
        if(e.keyCode==65)//a
            lLeft = false;
        if(e.keyCode==68)//d
            lRight = false;
        //RIGHT HAND
        if(e.keyCode==38)//up arrow
            rUp = false;
        if(e.keyCode==40)//down arrow
            rDown = false;
        if(e.keyCode==37)//left arrow
            rLeft = false;
        if(e.keyCode==39)//right arrow
            rRight = false;
        
        if(e.keyCode == 27){
            exitGame('m', 'Hands Solo', 350);
        }
    } 
}
//speed, l vel x, l vel y, r vel x, r vel y, friction, maxSpeed;
var movement = [0.5, 0, 0, 0, 0, 0.91, 8];
function handleControls(){
    //Left movement
    if(lUp) movement[2] -= movement[0];
    else if(lDown) movement[2] += movement[0];
    else movement[2] *= movement[5];
    
    if(lLeft)movement[1] -= movement[0];
    else if(lRight)movement[1] += movement[0];
    else movement[1] *= movement[5];
    
    lhX += movement[1]; lhY += movement[2];
    rhX += movement[3]; rhY += movement[4];
    
    if (movement[1] > movement[6])
		movement[1] = movement[6];
	else if (movement[1] < -movement[6])
		movement[1] = -movement[6];
 
	if (movement[2] > movement[6])
		movement[2] = movement[6];
	else if (movement[2] < -movement[6])
		movement[2] = -movement[6];
    
    //right movement
    if(rUp)movement[4] -= movement[0];
    else if(rDown)movement[4] += movement[0];
    else movement[4] *= movement[5];
    
    if(rLeft)movement[3] -= movement[0];
    else if(rRight)movement[3] += movement[0];
    else movement[3] *= movement[5];
    
    if (movement[3] > movement[6])
		movement[3] = movement[6];
	else if (movement[1] < -movement[6])
		movement[3] = -movement[6];
 
	if (movement[4] > movement[6])
		movement[4] = movement[6];
	else if (movement[4] < -movement[6])
		movement[4] = -movement[6];
    
    //limit to edges
    if(lhX < 0) lhX = 0;
    if(lhX > 964) lhX = 964;
    if(lhY < 0) lhY = 0;
    if(lhY > 708) lhY = 708;
    
    if(rhX < 0) rhX = 0;
    if(rhX > 964) rhX = 964;
    if(rhY < 0) rhY = 0;
    if(rhY > 708) rhY = 708;
    
}
//HANDLES HAND TINTING
function imgdye (image, color, opacity) {
  if (color == null) {
    throw new Error('Expecting second argument to be a color.')
  }

  var buffer = document.createElement('canvas')
  buffer.width = image.width
  buffer.height = image.height
  var ctx = buffer.getContext('2d')

  ctx.fillStyle = color
  if (opacity != null) ctx.globalAlpha = opacity
  ctx.fillRect(0, 0, buffer.width, buffer.height)
  ctx.globalCompositeOperation = 'destination-atop'
  ctx.globalAlpha = 1
  ctx.drawImage(image, 0, 0)

  return buffer
}

if (typeof module === 'object') {
  module.exports = imgdye
}

//HIGHSCORE STUFF
App42.initialize(KEYS GO HERE);
var scoreBoardService = new App42ScoreBoard();
function submitHighScore(userName, gameScore){
    scoreBoardService.saveUserScore("GAME NAME HERE",userName,gameScore,{    
    success: function(object){    
        var game = JSON.parse(object);    
        var result = game.app42.response.games.game;  
        var scoreList = result.scores.score;  
    },    
    error: function(error) {  
        console.log("error")
    }    
}); 
}
var scores = [];
function getScores(){
    scores = [];
    scoreBoardService.getTopRankings("GAME NAME HERE",{  
        success: function(object){     
            var game = JSON.parse(object);  
            var result = game.app42.response.games.game; 
		    var scoreList = result.scores.score;
            if (scoreList instanceof Array) {                  
                for (var i = 0; i < scoreList.length; i++){
                    scores[i]=""+scoreList[i].userName+" - "+ scoreList[i].value;
                    if(i > 4)break;
                 }              
             } else {  
                 scores[0]=""+scoreList.userName+" - "+ scoreList.value;
             }
            gameState = 'h';
            heading = "Highscores"; headingY = 250;
            drawScreens();
        },      
        error: function(error) {  
            scores[0]="Highscores unavailable";
            gameState = 'h';
            heading = "Highscores"; headingY = 250;
            drawScreens();
	   }
    }); 
    
    
}
