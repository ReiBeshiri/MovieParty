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
        
        if(!(socket.handshake.query.name === undefined))
            usernameSocketId.set(socket.handshake.query.name, socket.id);

        usernameSocketId.forEach((v,k) => {
            console.log("v: " + v +", k: " + k)
        })

        console.log('We have a new connection!!');
        console.log("nome utente: " + socket.handshake.query.name + ", id:" + socket.id)
    
        socket.on('join', (data) => { 
            console.log("entra nella stanza |" + data.room + "|: " + data.myusername)
            socket.join(data.room) //FORSE BISOGNA FARE ANCHE IL CONTRARIO DELLA JOIN, quando un utente lascia il party

            socket.emit('message', { user: 'admin', text: `${data.myusername}, welcome to room ${data.room}.`});
            socket.broadcast.to(data.room).emit('message', { user: 'admin', text: `${data.myusername} has joined!`});
        });

        socket.on('leave', (data) =>{
            socket.leave(data.room)
            console.log("sono uscito dalla stanza |" + data.room)
        })

        socket.on('moviePartyInviteSender', (data)=>{
            console.log("movieparty invito: " + data.sender + " " + data.receiver + ", movieURL:" + data.movieURL)
            sendPrivateMessage(data.receiver, "moviePartyInviteReceiver", {sender: data.sender, room: data.room, movieURL: data.movieURL})
        })

        socket.on("moviePartyInviteResponse", (data)=>{
            console.log("movieparty risposta: " + data.requestReceiver + " " + data.response)
            sendPrivateMessage(data.requestSender, "moviePartyInviteResponse", {receiver: data.requestReceiver, accept: data.response})
        })

        socket.on("startparty", ({roomName})=> {
            console.log(roomName + " incomincia il party")
            socket.broadcast.to(roomName).emit("partystarted", {})
        })

        socket.on("chatMessage", (data) => {
            console.log("from: " + data.username + " to: " + data.roomName + " --> " + data.message)
            socket.broadcast.to(data.roomName).emit("receiveChatMessage", {username: data.username, text: data.message})
        })

        socket.on("synchronizeVideo", (data) => {
            console.log("synchronizing party to timestamp: " + data.timestamp, " playing: "+data.playing)
            socket.broadcast.to(data.roomName).emit("synchronizeParty", data)
        })

        socket.on('remove', username => {
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
        console.log("spedisco")
        let usr = usernameSocketId.get(receiverUser)
        io.to(usr).emit(eventName, data);
        console.log("Private message "+ eventName +" sent to " + data + " from "+ receiverUser)
    }
}

function isOnline(user){
    return usernameSocketId.has(user)
}

module.exports = { serverSocket, sendPrivateMessage, isOnline };

