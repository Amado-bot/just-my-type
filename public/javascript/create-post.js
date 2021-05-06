async function postFormHandler(event){
    // prevent page from reloading
    event.preventDefault();

    const post_url = document.querySelector('input[name="post-url"]').value;
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('input[name="post-body"').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        document.location.replace('/');
    } else {
        alert('There was an error.' + response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', postFormHandler);