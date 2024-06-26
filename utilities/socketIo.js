
let users = {};
exports.socket = (io)=>{
    io.on('connection',(socket)=>{
        console.log('new client connected');
    
        socket.on('sendMessage',(data)=>{
            io.emit('recivedMessage',data)
            console.log(data);
        })

        socket.on('register', (username) => {
            users[username] = socket.id;
            socket.username = username;
            console.log(`User registered: ${username} with socket ID: ${socket.id}`);
        });
    
        
        socket.on('private_message', ({ recipient, message }) => {
            if (users[recipient]) {
                io.to(users[recipient]).emit('private_message', {
                    sender: socket.username,
                    message
                });
            } else {
                socket.emit('user_not_found', recipient);
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