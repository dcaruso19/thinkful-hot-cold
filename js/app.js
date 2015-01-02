
$(document).ready(function(){
    newGame();

    /*--- Display information modal box ---*/
    $(".what").click(function(){
        $(".overlay").fadeIn(1200);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
        $(".overlay").fadeOut(1200);
    });

    $("a.new").click(function() {
        newGame();
    });

    $("#guessButton").click(function(event) {
        event.preventDefault();
        guess();
    });
});

var secretNumber;
var feedback;
var userGuess;
var guessCount;
var guessList;
var distance;

function newGame() {
    disableInput(false);
    secretNumber = getSecretNumber();

    feedback = "Make your Guess!";
    userGuess = "";
    guessCount = 0;
    guessList = [];
    updateDisplay();
}

function guess() {
    var guess = parseInt($("#userGuess").val());
    if(!isValidGuess(guess)){
        userGuess = "";
        updateDisplay();
        return;
    }
    feedback = getFeedback(guess);
    guessCount++;
    guessList.push(guess);
    userGuess = "";
    updateDisplay();
}

function updateDisplay() {
    $("#feedback").text(feedback);
    $("#userGuess").val(userGuess);
    $("#count").text(guessCount);
    $("#feedback").text(feedback);
    $("#guessList").empty();
    if(guessList.length > 0) {
        for(var i = 0; i < guessList.length; i++) {
            var listItem = "<li>" + guessList[i] + "</li>";
            $("#guessList").append(listItem);
        }
    }
    $("#userGuess").focus();
}

function getFeedback(guess) { 
    /*
      1. First check to see if guess is correct.
      2. Check if very hot(1-10), hot(11-20), warm(21-30), cold(31-50), or ice cold (51+).
      3. If first guess then just compare if it is higher or lower than secret.
      4. If not hot or cold, then compare warmer or cooler to previous guess.
    */



    /* first guess. Just evaluate high or low. */
    if(guessList.length === 0){
        if (guess > secretNumber) {
            return "Your guess is too high";
        }
        else if (guess < secretNumber) {
            return "Your guess is too low";
        }
        return;
    }






    var distance = Math.abs(secretNumber - guess)

    if(guess == secretNumber) {
        disableInput(true);
        return "You guessed it!";
    }

    /* within 10 of secret is very hot */
    if(distance <= 10){
        $("#feedback").css({"background-color":"#ff0508"});
        return "You are very hot!";
    }


/* within 11-20 of secret is hot */
    if(distance >10 && distance <= 20){
        $("#feedback").css({"background-color":"#FF3B02"});
        return "You are hot!";
}


/* within 21-30 of secret is warm */
   if(distance >20 && distance <= 30){
        $("#feedback").css({"background-color":"#EA4646"});
        return "You are warm!";
}

/* within 31-50 of secret is cold */
   if(distance >30 && distance <= 50){
        $("#feedback").css({"background-color":"blue"});
        return "You are cold!";
}


    /* more than 50 away from secret is ice cold */
    if(distance > 50){
        $("#feedback").css({"background-color":"#46eaea"}); 
        return "You are ice cold!";
    }




    /* Colder compared to previous option.*/
    var previousGuess = guessList[guessList.length - 1];
    if((guess > secretNumber && guess > previousGuess) ||
        (guess < secretNumber && guess < previousGuess)) {
        return "Getting colder!";
    }

    /* Warmer compared to previous option.*/
    if((guess > secretNumber && guess < previousGuess) ||
        (guess < secretNumber && guess > previousGuess)) {
        return "Getting warmer!";
    }

    /* if I get here then there is a missing condition I haven't calculated */
    return "There has been an unexpected error!";
}









function isValidGuess(guess) {
    /* trusting in JavaScript Or short circuit here! */
    if(!isInteger(guess) || guess < 1 || guess > 100) {
        alert("Please enter an integer between 1 and 100.");
        return false;
    }

    if($.inArray(guess, guessList) !== -1){
        alert("You have already guessed " + guess);
        return false;
    }

    return true;
}

function getSecretNumber() {
    /* Produces random number between 1 and 100
     see information here: http://www.w3schools.com/jsref/jsref_random.asp */
    return Math.floor((Math.random() * 100) + 1);
}

function disableInput(disabled) {
    $("#userGuess").prop("disabled", disabled);
    $("#guessButton").prop("disabled", disabled);
}

function isInteger(input) {

    if(input == null || input == undefined || input.toString().trim().length == 0) {
   return false;
}

    var value = +input;
    if(isNaN(input)){
        return false;
    }
    if(input % 1 !== 0){
        return false;
    }
    return true;


}