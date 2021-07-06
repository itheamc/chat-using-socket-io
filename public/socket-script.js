const socket = io({
    auth: {
        user: localStorage.getItem('user-name')
    }
});

// Receiving the total active client number from the socket server
socket.on('active-clients', (data) => {
    // console.log(data);
    addActiveClientsOnUi(data);
})

// Receiving the clients message from the socket server
socket.on('client-message', (data) => {
    // console.log(data)
    addMessageOnUI(data);
})

socket.on('typing-status', (data) => {
    // console.log(data)
})


// Listening the client join notification
socket.on('new-client', (data) => {
    // console.log(data)
    addJoinedNotificationOnUi(data)
})

// Listening the client left notification
socket.on('client-left', (data) => {
    // console.log(data)
    addLeftNotificationOnUi(data)
})

// Listening to start typing event
socket.on('client-typing', (data) => {
    addTypingStatusOnUi(data)
})

socket.on('remove-typing-status', (data) => {
    removeTypingStatusFromUi(data)
})

socket.on('user-name-updated', (data) => {
    addNameChangeNotificationOnUi(data)
})