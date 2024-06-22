let apiKey = '';

function setApiKey() {
    apiKey = document.getElementById('api-key-input').value;
    if (apiKey) {
        document.getElementById('user-input').disabled = false;
        document.querySelector('.input-container button').disabled = false;
    } else {
        alert('Please enter a valid API key.');
    }
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    appendMessage('bot', botMessage);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
