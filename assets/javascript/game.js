//todo: letter-only input

//Declare global variables
var init = 0;

var winCounter = 0;
var lossCounter = 0;
var guessesRemaining = 0;

var keyPress = "";
var emptyWord = []
var guessedLetters = []
var currentFruit = "";
var fruitsList = [
    "apple",
    "apricot",
    "avocado",
    "banana",
    "blackberry",
    "blackcurrant",
    "blueberry",
    "cantaloupe",
    "cherry",
    "clementine",
    "coconut",
    "cranberry",
    "cucumber",
    "currant",
    "date",
    "dragonfruit",
    "durian",
    "elderberry",
    "eggplant",
    "fig",
    "gooseberry",
    "grape",
    "grapefruit",
    "guava",
    "huckleberry",
    "jackfruit",
    "kiwifruit",
    "lemon",
    "lime",
    "loquat",
    "longan",
    "lychee",
    "mandarine",
    "mango",
    "mulberry",
    "nectarine",
    "olive",
    "orange",
    "papaya",
    "passionfruit",
    "peach",
    "pear",
    "persimmon",
    "plantain",
    "plum",
    "pineapple",
    "pomegranate",
    "pomelo",
    "pumpkin",
    "raspberry",
    "squash",
    "strawberry",
    "tamarind",
    "tangerine",
    "tomato",
    "watermelon"
];

//divlist: score, word, guesses-remaining, guessed-letters
var scoreDiv = document.getElementById("score");
var wordDiv = document.getElementById("word");
var guessesRemainingDiv = document.getElementById("guesses-remaining");
var guessedLettersDiv = document.getElementById("guessed-letters");
var initializerDiv = document.getElementById("initializer");
var cheaterDiv = document.getElementById("cheater");



//Declare functions

function initialize() {
    //Get our fruit!
    currentFruit = fruitsList[Math.floor(Math.random()*fruitsList.length)].toUpperCase();

    //Initialize guesses
    guessesRemaining = currentFruit.length + 5;
    guessesRemainingDiv.textContent = guessesRemaining;

    //Initialize guessed letters
    guessedLetters = [];
    guessedLettersDiv.textContent = "Use your keyboard to get started...";

    //Reprint score -- score is NOT rerolled!
    scoreDiv.textContent = "Wins: " + winCounter + " | Losses: " + lossCounter;

    //Build the hangman
    emptyWord = [];
    for (var i = 0; i < currentFruit.length; i++) {
        emptyWord.push("_");
    }
    wordDiv.textContent = emptyWord.join(" ");

    //Initialize the initializer
    initializerDiv.textContent = "Good luck!";

    //Some quality-of-life cheating
    cheaterDiv.textContent = "You cheater! The fruit is: " + currentFruit;

    //Finally, start the game!
    init = 1;

}


//code

initialize();

document.addEventListener("keyup", function(event){

    if (init == 1 && event.which >= 65 && event.which <= 90) {

        keyPress = event.key.toUpperCase()

        for (var j = 0; j < currentFruit.length; j++) {
            if (keyPress == currentFruit.charAt(j)) {
                emptyWord[j] = keyPress;
                wordDiv.textContent = emptyWord.join(" ");
            }
        }

        if (guessedLetters.indexOf(keyPress) == -1) {
            guessedLetters.push(keyPress);
            guessedLettersDiv.textContent = guessedLetters.join(", ");
            guessesRemaining--;
            guessesRemainingDiv.textContent = guessesRemaining;
        }


        //game end - win
        if (emptyWord.join("") == currentFruit) {
            winCounter++;   
            scoreDiv.textContent = "Wins: " + winCounter + " | Losses: " + lossCounter;
            initializerDiv.textContent = "You've won! Click the \"new game\" button to start a new game...";
            init = 0;
        }

        //game end - loss (done after with init == 1 in case last guess is correct--win should display, not loss)
        if (guessesRemaining == 0 && init == 1) {
            lossCounter++;
            scoreDiv.textContent = "Wins: " + winCounter + " | Losses: " + lossCounter;
            initializerDiv.textContent = "You've lost! Click the \"new game\" button to start a new game...";
            init = 0;
        }
    }
});

