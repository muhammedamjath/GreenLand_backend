
let users = {};
exports.socket = (io)=>{
    io.on('connection',(socket)=>{
        console.log('new client connected');
    
        socket.on('register', (reciverId) => {
            users[reciverId] = socket.id;
            socket.reciverId = reciverId;
            console.log(`User registered: ${reciverId} with socket ID: ${socket.id}`);
        });

  
        socket.on('sendMessage', (  message ) => {
            const receiverSocketId = users[message.receiver];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('recivedMessage',message);
            } else {
                socket.emit('user_not_found', receiverSocketId);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected: ' + socket.id);
            if (socket.username) {
                delete users[socket.username];
            }
        });
    })
}