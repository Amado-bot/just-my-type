const random_text_url = 'https://type.fit/api/quotes'

let TIME_LIMIT = 60;

let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
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

function getRandomText() {
    return fetch(random_text_url)
        .then(randomText => randomText.json())
};

async function renderRandomText() {
    await getRandomText()
    textDisplayElement.innerText = randomText
    textDisplayElement.innerHTML = ''
    randomText[Math.floor(Math.random() * randomText.length)].text.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        // characterSpan.classList.add('correct');
        characterSpan.innerText = character
        textDisplayElement.appendChild(characterSpan)
    })
    document.getElementById('textInput').value = '';
}

function startGame() {
    resetValues();
    renderRandomText();
}



function processTextInput() {
    curr_input = textInput.area.value;
    curr_input_array = curr_input.split(' ');

    characterTyped++;
    errors = 0;

    arrayQuote.forEach((char, index) => {
        const typedChar = arrayValue[index]
        if (typedChar == null) {
            char.classList.remove('correct');
            char.classList.remove('incorrect');

            // correct character
        } else if (typedChar === char.innerText) {
            char.classList.add('correct');
            char.classList.remove('incorrect');

            // incorrect character
        } else {
            char.classList.add('incorrect');
            char.classList.remove('correct');

            // increment number of errors
            errors++;
        }
    });
    error_text.textContent = total_errors + errors;

    //   update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);
  

    if (curr_input.length == current_quote.length) {
        renderRandomText();

        //update errors
        total_errors += errors;
        //clear input area
        textInput.value = '';
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