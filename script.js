let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: "; //when the user makes their first guess, start a list of the guesses.
    }
    guesses.textContent += ` ${userGuess}`; //shows text of recent guesses

    if (userGuess === randomNumber) { //correct guess
        lastResult.textContent = "Congratulations! You guessed it! The number was " + randomNumber;
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) { //if user reaches the limit of 10 guesses
        lastResult.textContent = "Game over, you have run out of guesses";
        lowOrHi.textContent = "";
        setGameOver();
    } else { //if user guesses incorrectly.
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Too low!"; //guess was too low
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Last guess was too high!"; //guess was too high
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess); //Submits field to be checked.
guessField.addEventListener("keydown", function(event) { //Adds an event listener to the "Enter" key upon pressing.
    if (event.key === 'Enter')
    {
        event.preventDefault();
        checkGuess();
    }
})

//============GAME OVER CODE===============================
//Turns the guess field and submit button off, and adds a reset button to start over.
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start a new game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}