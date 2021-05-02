// const random_text_url = 'https://type.fit/api/quotes'

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