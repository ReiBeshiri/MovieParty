const usernameSocketId = new Map();//serve per mappare username a socket id
var io;

function serverSocket(server){
    
    io = require("socket.io")(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        

        //map.add(newUser)
        if(!(socket.handshake.query.name === undefined))
            usernameSocketId.set(socket.handshake.query.name, socket.id);

        usernameSocketId.forEach((v,k) => {
            console.log("v: " + v +", k: " + k)
        })

        console.log('We have a new connection!!');
        console.log("nome utente: " + socket.handshake.query.name + ", id:" + socket.id)
    
        /*socket.on('join', ({friendUsername}, callback) => { 
            console.log("è arrivato un messaggio")
            console.log("arrivato: " + friendUsername)
        });*/

        socket.on('remove', username => {

            //disconnec from room
            /*const user = removeUser(socket.id);
            if(user) {
                io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
            }*/

            //map.remove(user) 
            console.log("user disconnected " + username + socket.id)
            usernameSocketId.delete(username)
            usernameSocketId.forEach((v,k) => {
                console.log("v: " + v +", k: " + k)
            })

        })
    
        socket.on('disconnect', () => {})
    });

}

function sendPrivateMessage(receiverUser, eventName, data) {
    if(usernameSocketId.has(receiverUser)){ //send the real-time request if the receiver is online.
        let usr = usernameSocketId.get(receiverUser)
        io.to(usr).emit(eventName, data);
        console.log("Private message "+ eventName +" sent to " + data + " from "+ receiverUser)
    }

}

function isOnline(user){
    return usernameSocketId.has(user)
}

module.exports = { serverSocket, sendPrivateMessage, isOnline };

