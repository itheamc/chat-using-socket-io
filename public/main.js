const volumeUp = document.getElementById('volumeup');
 const volumeDown = document.getElementById('volumedown');
 const powerRocker = document.getElementById('poweronoff');
 const mobileScreen = document.getElementById('mobile-screen');
 const deviceScreen = document.getElementById('device-screen');
 const lockScreen = document.getElementById('lock-screen');
 const recentTime = document.getElementById('time');
 const statusTime = document.getElementById('status-time');

const userName = document.getElementById('username');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message');
const messagesList = document.getElementById('message-list');



messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (messageInput.value === '') return;

    const message = {
        id: socket.id,
        name: userName.value,
        message: messageInput.value,
    }
    socket.emit('message', message);   // Sending message to the server so as to broadcast to the other active clients
    appendMessageOnUI(message);
    clearMessageInput();
})

// Function to clear the input field
const clearMessageInput = () => {
    messageInput.value = '';
}

// function to handle onfocus event on input text field
const handleOnFocus = () => {
    const data = `${socket.id} is typing...`;
    socket.emit('client-typing', data);
}

const handleOnBlur = () => {
    const data = '';
    socket.emit('client-typing', data);
}

messageInput.addEventListener('focus', handleOnFocus);
messageInput.addEventListener('blur', handleOnBlur);




/**
 * These are the functions connected with the socket-script.js file
 * These functions wil handle the chat message sent by the client
 */

const appendMessageOnUI = (data) => {
    const list_element = `<li class="${data.id === socket.id ? "right-message-container" : "left-message-container"}">
    <div class="${data.id === socket.id ? "message-right" : "message-left"}">
        <span class="message">${data.message}</span>
        <span class="${data.id === socket.id ? 'date-right' : 'date-left'}">${moment().format('LT')}</span>
    </div>
    <div class="${data.id === socket.id ? 'user-name-right' : 'user-name-left'}">
        <i class="${data.id === socket.id ? 'fas' : 'far'} fa-user-circle"></i>
        <p>${data.id === socket.id ? 'You' : data.name}</p>
    </div>
    </li>`

    messagesList.innerHTML += list_element;
    scrollToBottom();
}




// Scroll the chat list automatically to the buttom
const scrollToBottom = () => {
    messagesList.scrollTo(0, messagesList.scrollHeight);
}





/**
 * These are Ui related javascript codes______________________________
 */
 let isIndicatorVisible = false;
 let isLocked = true;
 
 
 // --------Function to handle volume up button-------------------
 
 const increaseVolume = () => {
     volumeUp.style.left = '-1px';
 
     setTimeout(() => {
         volumeUp.style.left = '0px';
     }, 150)
 }
 
 
 // -------Function to handle volume down button------------------
 
 const decresaeVolume = () => {
     volumeDown.style.left = '-1px';
 
     setTimeout(() => {
         volumeDown.style.left = '0px';
     }, 150);
 
 }
 
 //----Function to handle Event Listener on volume down and Up button -------
 volumeUp.addEventListener('click', increaseVolume)
 volumeDown.addEventListener('click', decresaeVolume)
 
 
 // ------------------------------------Function to handle power rocker button------------------------------
 powerRocker.addEventListener('click', () => {
     powerRocker.style.left = '-1px';
 
     if (isLocked == true) {
         mobileScreen.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
         lockScreen.style.visibility = 'hidden';
         deviceScreen.style.visibility = 'visible';
         isLocked = false;
 
     } else {
         mobileScreen.style.backgroundColor = '#052339';
         lockScreen.style.visibility = 'visible';
         deviceScreen.style.visibility = 'hidden';
         isLocked = true;
     }
     setTimeout(() => {
         powerRocker.style.left = '0px';
     }, 200)
 })
 
 
 // Implementation of the double tap functionality
 let tapTimes = 0;
 lockScreen.addEventListener('click', () => {
     tapTimes += 1;
     if (tapTimes == 2) {
         mobileScreen.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
         lockScreen.style.visibility = 'hidden';
         deviceScreen.style.visibility = 'visible';
         isLocked = false;
         tapTimes = 0;
         return
     } 
 
     setTimeout(() => {
         tapTimes = 0;
     }, 500)
 })
 
 
 // Function to change the current time
 const updateRecentTime = () => {
     let h = "0";
     let m = "0";
     let s = "0";
     const date = new Date();
     if (date.getHours() < 10) {
         h = `0${date.getHours()}`
     } else {
         h = date.getHours();
     }
     if (date.getMinutes() < 10) {
         m = `0${date.getMinutes()}`
     } else {
         m = date.getMinutes();
     }
     if (date.getSeconds() < 10) {
         s = `0${date.getSeconds()}`
     } else {
         s = date.getSeconds();
     }
     recentTime.innerText = `${h}:${m}:${s}`;
     statusTime.innerText = `${h > 12 ? (h-12) : h}:${m} ${h > 12 ? 'PM' : 'AM'}`;
 }
 
 // for status time
 
 setInterval(updateRecentTime, 1000);