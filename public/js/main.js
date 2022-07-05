const socket = io();
console.log("start");

socket.on('message' , message => {
    console.log(message);
})
