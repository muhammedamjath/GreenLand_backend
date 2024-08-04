
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
                console.log(users);
                io.to(receiverSocketId).emit('recivedMessage',message);
            } else {
                socket.emit('user_not_found', receiverSocketId);
            }
        });

        

        socket.on('disconnect',()=>{
            console.log('hooooolooooooooooo');
            if (socket.reciverId) {
                console.log('heloooooooooo disconnceted');
                console.log(users);
                delete users[socket.reciverId];
                console.log(users);
            }
        });
    })
}