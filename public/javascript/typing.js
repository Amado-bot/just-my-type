// const random_text_url = 'https://type.fit/api/quotes'

// //i would like to change this so that i can choose the time limit//
// let TIME_LIMIT = 60;

// let timer_text = document.querySelector(".curr_time");
// let accuracy_text = document.querySelector(".curr_accuracy");
// let error_text = document.querySelector(".curr_errors");
// let cpm_text = document.querySelector(".curr_cpm");
// let wpm_text = document.querySelector(".curr_wpm");
// let input_area = document.querySelector(".input_area");
// let restart_btn = document.querySelector(".restart_btn");
// let cpm_group = document.querySelector(".cpm");
// let wpm_group = document.querySelector(".wpm");
// let error_group = document.querySelector(".errors");
// let accuracy_group = document.querySelector(".accuracy");



// let timeLeft = TIME_LIMIT;
// let timeElapsed = 0;
// let total_errors = 0;
// let errors = 0;
// let accuracy = 0;
// let characterTyped = 0;
// let current_quote = "";
// let quoteNo = 0;
// let timer = null;



function processCurrentText() {
    textInputElement.addEventListener('input', () => {
        const arrayQuote = textDisplayElement.querySelectorAll('span')
        const arrayValue = textInputElement.value.split('')
        
        let correct = true
        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index]
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
    document.getElementById('textInput').value = '';
}



// const startT = () => {
//     timerElement.innerText = 0
//     startTime = new Date()
//     setInterval(() => {
//         timer.innerText = getTimerTime()
//     }, 1000)
// }

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    // quoteNo = 0;
    // input_area.disabled = false;
    input_area.value = '';
    
}

function startGame() {
  
    // resetValues();
    // updateQuote();
    
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
  
  // function getTimerTime() {
//   return Math.floor((new Date() - startTime) / 1000)
// }

renderRandomText();


document.getElementById("restartButton").addEventListener("click", function () {
    document.getElementById('textInput').value = '';
    location.reload();
});