const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('/sounds/notify.mp3');

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('messageCenter');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'messageCenter')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('messageCenter', name => {
    append(`${name} left the chat`, 'messageCenter')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})