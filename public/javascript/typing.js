const random_text_url = 'https://type.fit/api/quotes'
const textInputElement = document.getElementById('textInput');
const textDisplayElement = document.getElementById('textDisplay');
const timerElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');

// const reset = () => {
document.getElementById("restartButton").addEventListener("click", function() {
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
            correct = false
        }
    })

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
        characterSpan.classList.add('correct');
        characterSpan.innerText = character
        textDisplayElement.appendChild(characterSpan)
    })
    textInputElement.value = null
}

// const startTime = () => {
//     if (gameStarted) {
//       timer = setTimeout(() => {
//         time += 10;
//         startTime();
//       }, 10);
//     } else {
//       timer = undefined;
//       gameStarted = false;
//     }
//   };

const startTimer=()=> {
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
