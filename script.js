let apiKey = '';

function startChat() {
    apiKey = document.getElementById('api-key').value;
    if (apiKey) {
        document.querySelector('.api-key-container').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';
    } else {
        alert('Please enter your OpenAI API key.');
    }
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    displayMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].text.trim();
    displayMessage(botMessage, 'bot');
}

function displayMessage(message, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', sender);
    messageContainer.textContent = message;
    document.getElementById('messages').appendChild(messageContainer);
    messageContainer.scrollIntoView({ behavior: 'smooth' });
}
