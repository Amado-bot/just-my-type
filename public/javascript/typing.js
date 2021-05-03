const random_text_url = 'https://type.fit/api/quotes'

let TIME_LIMIT = 60;

let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

async function getRandomText() {
    const randomText = await fetch(random_text_url);
    return await randomText.json();
};

async function renderRandomText() {
    await getRandomText()
    quote_text.innerText = randomText
    quote_text.innerHTML = ''
    randotext.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quoteText.appendChild(charSpan)
    })
    document.getElementById('text-input').value = ('');
}

function startGame() {
    resetValues();
    renderRandomText();

    clearInterval(timer);
    timer = setInterval(updateTimer,1000)
}

function updateTimer() {
    if (timeLeft > 0) {
      // decrease the current time left
      timeLeft--;
    
      // increase the time elapsed
      timeElapsed++;
    
      // update the timer text
      timer_text.textContent = timeLeft + "s";
    }
    else {
      // finish the game
      finishGame();
    }
  }


function processCurrentText() {

    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    // increment total characters typed
    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]

        // character not currently typed
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

            // correct character
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

            // incorrect character
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            // increment number of errors
            errors++;
        }
    });

    // display the number of errors
    error_text.textContent = total_errors + errors;

    // update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
        updateQuote();

        // update total errors
        total_errors += errors;

        // clear the input area
        input_area.value = "";
    }
}


function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}

// document.getElementById("restartButton").addEventListener("click", function () {
//     document.getElementById('textInput').value = '';
//     location.reload();
// });