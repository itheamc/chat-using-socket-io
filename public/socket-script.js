const socket = io();

// Receiving the total active client number from the socket server
socket.on('active-clients', (data) => {
    console.log(data);
})

// Receiving the clients message from the socket server
socket.on('client-message', (data) => {
    // console.log(data)
    appendMessageOnUI(data);
})

socket.on('typing-status', (data) => {
    // console.log(data)
})

