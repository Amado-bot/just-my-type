// async so the function doesn't stop the page from loading
async function signupFormHandler(event) {
    // prevent the page from reloading
    event.preventDefault();

    // grab the username input 
    const username = document.querySelector('#username-signup').value.trim();
    // grab the email input
    const email = document.querySelector('#email-signup').value.trim();
    // grab the password input
    const password = document.querySelector('#password-signup').value.trim();

    // make sure all three fields are filled out
    if (username && email && password) {
        // create the user using a post request
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            window.alert('User created, please sign in now!');
        } else {
            alert('You need to fill out all the required fields!' + response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);