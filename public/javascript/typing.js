let TIME_LIMIT = 60;

const random_text_url = 'https://type.fit/api/quotes'
  
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

function getRandomQuote() {
    return fetch(random_text_url)
        .then(response => response.json())
}



async function updateQuote() {
    const randomText = await getRandomQuote()
    quote_text.innerText = randomText
    quote_text.innerHTML = ''
    randomText[Math.floor(Math.random() * randomText.length)].text.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.classList.add('correct');
        characterSpan.innerText = character
        quote_text.appendChild(characterSpan)
    })
    input_area.value = null
}

function processCurrentText() {
  
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');
  
  characterTyped++;
  
  errors = 0;
  
  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]
  
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

    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
    
    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
  
  // display the number of errors
  error_text.textContent = total_errors + errors;
  
  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);
  
  if (curr_input.length ==quoteSpanArray.length) {
    finishGame();
  
    // update total errors
    total_errors += errors;
  
    // clear the input area
    input_area.value = "";
  }
}

function startGame() {
  
  resetValues();
  updateQuote();
  
  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
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
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
  
    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  
  input_area.disabled = true;
  
  quote_text.textContent = "Click on restart to start a new game.";
  
  restart_btn.style.display = "block";
  
  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";

  console.log(wpm_text);
  
  // removed "await" because it kept breaking the game - Ava
  const response = fetch('/api/score', {
    method: 'post',
    body: JSON.stringify({
        wpm_text,
        accuracy_text
    }),
    headers: { 'Content-Type': 'application/json' }  
  });

}

