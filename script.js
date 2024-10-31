let users = [];
let connectedUsers = new Set(); // Para manejar usuarios conectados
const app = document.getElementById('app');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const welcomeMessage = document.getElementById('welcome-message');
const chatContainer = document.getElementById('chat-container');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message');
const adminPanel = document.getElementById('admin-panel');
const connectedUsersDiv = document.getElementById('connected-users');

function updateConnectedUsers() {
    connectedUsersDiv.innerHTML = `Usuarios Conectados: ${Array.from(connectedUsers).join(', ')}`;
}

// Maneja el registro de usuarios
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newUsername = document.getElementById('new-username').value;
    if (!users.includes(newUsername)) {
        users.push(newUsername);
        alert("Usuario registrado: " + newUsername);
    } else {
        alert("El usuario ya existe.");
    }
});

// Maneja el inicio de sesión
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    if (users.includes(username)) {
        connectedUsers.add(username);
        welcomeMessage.innerText = `Bienvenido, ${username}!`;
        welcomeMessage.classList.remove('hidden');
        chatContainer.classList.remove('hidden');
        adminPanel.classList.remove('hidden');

        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');

        updateConnectedUsers();
    } else {
        alert("Usuario no encontrado.");
    }
});

// Maneja el envío de mensajes
sendMessageButton.addEventListener('click', function() {
    const message = messageInput.value;
    const username = [...connectedUsers][connectedUsers.size - 1]; // Obtiene el último usuario conectado
    if (message.trim() !== "") {
        const messageElement = document.createElement('div');
        messageElement.innerText = `${username}: ${message}`;
        messageElement.classList.add('user-message');
        messagesDiv.appendChild(messageElement);
        messageInput.value = '';
    }
});

// Actualiza el panel del administrador
setInterval(updateConnectedUsers, 1000);
