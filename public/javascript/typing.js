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

function processTextInput() {
    curr_input = textInput.area.value;
    curr_input_array = curr_input.split(' ');

    characterTyped++;
    errors = 0;

    arrayQuote.forEach((char, index) => {
        const typedChar = arrayValue[index]
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
        error_text.textContent = total_errors + errors;

        if (curr_input.length == current_quote.length) {
            renderRandomText();

            total_errors+=errors;

            textInput.value= '';
        }
}


// document.getElementById("restartButton").addEventListener("click", function () {
//     document.getElementById('textInput').value = '';
//     location.reload();
// });