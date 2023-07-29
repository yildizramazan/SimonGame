
var gamePattern = []
var buttonColors = ["blue", "green", "red", "yellow"]
var userClickedPattern = [];
var level = 0;
var started = false;



$(document).keydown(function(event){
    if (!started) {
        console.log(event.key);
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});




$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
    } else {
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 100);
        console.log("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();

    }

}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}



function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

