var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(".btn").click(function () {

        var userChosenColor = $(this).attr("id");
    
        userClickedPattern.push(userChosenColor);
    
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1); 
        
    
});


function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); 

    $("#"+ randomChosenColor ).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);

   level++;
   $("#level-title").text("Level "+ level);
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();  
}

function animatePress(currentColor) {

    $("#"+ currentColor).addClass("pressed");

    setTimeout(function () {
        $("#"+ currentColor).removeClass("pressed");
    },100);
    
}

function checkAnswer(currentLevel) {

   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function () {
            nextSequence();
        },1000);

    }     
   } else {
        var wrong = new Audio ("sounds/wrong.mp3");
        wrong.play();
        $("#level-title").text("GAME OVER, Press Any Key to Restart")
        $("body").addClass("game-over");

        setTimeout (function () {
            $("body").removeClass("game-over");
        },5000);
        startOver();
   }
}

$(document).on("keydown", function (e) {
    
    if (!started)  {

        nextSequence();
        started = true;
    }   
});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};



