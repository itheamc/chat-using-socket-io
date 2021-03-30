const express = require('express');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

// Requiring socket form the socket.io module
const io = require('socket.io')(server);

// Sending the static index.html file whenever someone make get request on the http://localhost:4000
app.use(express.static(path.join(__dirname, 'public')));


/*___________________________This is main Socket.Io Function____________________ */

// listening the socket connection
io.on('connection', handleSockets);


// Creating set to store the socket id
// I am creating set since it doesn't take dublicate value
const connectedSockets = new Set();

/**
 * function to handle the sockets connected
 * It will triggered out every time whenever client socket communicate with
 * the server */
function handleSockets(socket) {
    connectedSockets.add(socket.id);
    console.log(socket.handshake.auth)

    handleActiveSockets();
    notifyClientJoined(socket);
    handleDisconnect(socket);
    handleClientsMessages(socket);
    handleMessageTyping(socket);
}

// Function to handle the socket disconnection
function handleDisconnect(socket) {
    socket.on('disconnect', () => {
        connectedSockets.delete(socket.id);
        notifyClientLeft(socket);
        // console.log(`This socket -- ${socket.id} was disconnected`);
        handleActiveSockets();
    })
}

// Function to handle new client joined
function notifyClientJoined(socket) {
    socket.broadcast.emit('new-client', socket.id)
}

// Function to handle client left
function notifyClientLeft(socket) {
    socket.broadcast.emit('client-left', socket.id)
}

// Function to handle the total active clients data passed to the clients
function handleActiveSockets() {
    io.emit('active-clients', connectedSockets.size);
}

// Function to handle the data got from the clients as socket.emit('message', data)
function handleClientsMessages(socket) {
    socket.on('message', (message) => {
        // console.log(message);
        socket.broadcast.emit('client-message', message);
    })
}


// Function to handle the users event
function handleMessageTyping(socket) {
    socket.on('client-typing', (data) => {
        socket.broadcast.emit('typing-status', data);
    })
}