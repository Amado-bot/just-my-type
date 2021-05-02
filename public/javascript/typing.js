const random_text_url = 'https://type.fit/api/quotes'

//i would like to change this so that i can choose the time limit//
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

// const reset = () => {
document.getElementById("restartButton").addEventListener("click", function () {
    document.getElementById('textInput').value = '';
    location.reload();
});
// }



textInputElement.addEventListener('input', () => {
    const arrayQuote = textDisplayElement.querySelectorAll('span')
    const arrayValue = textInputElement.value.split('')

    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            errors++;
        }
    });

    //! roll over to the first quote; for when we make a word bank.//
    // if (quoteNo < quotes_array.length - 1)
    // quoteNo++;
    // else
    // quoteNo = 0;

    if (correct) renderNewQuote()
})

function getRandomText() {
    return fetch(random_text_url)
        .then(response => response.json())
}



async function renderRandomText() {
    const randomText = await getRandomText()
    textDisplayElement.innerText = randomText
    textDisplayElement.innerHTML = ''
    randomText[Math.floor(Math.random() * randomText.length)].text.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        // characterSpan.classList.add('correct');
        characterSpan.innerText = character
        textDisplayElement.appendChild(characterSpan)
    })
    textInputElement.value = null
}



const startTimer = () => {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

// function getTimerTime() {
//   return Math.floor((new Date() - startTime) / 1000)
// }

renderRandomText();
