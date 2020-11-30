const express = require('express');
//const socketio = require('socket.io');
const http = require('http');
const router = require('./router'); //consente di utilizzare i metodi definiti all'interno del file router

const PORT = process.env.PORT || 5000
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});
  
io.on('connection', (socket) => {
    console.log('We have a new connection!!');

    socket.on('join', ({ name, room }, callback) => { //Come secondo paremetro in seguito alla ricezione di un evento 'join' possiamo specificare una callback
        
        //Si mette "{ error, user }" in quanto addUser() potrebbe restituire un errore o un utente.
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.join(user.room); //Permette di aggiungere un utente a una room

        //Qui stiamo generando un evento dal backend verso il frontend
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`}); //Evento che convolge l'utente che sta entranto in chat
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`}); //Viene comunicato a tutti gli altri utenti della chat che è entrato un nuovo utente
        /*if(error){
            callback({error: 'error'}); //Se io commento questa callback lato Client non verrà eseguita la funzione specificata come terzo parametro dell'istruzione "socket.emit('join', { name, room }, ({error}) => {...});" 
        }*/

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id); //ci permette di capire chi ha spedito il messaggio. La socket passata come parametro è l'istanza di uno specifico Client.
    
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
        callback();
      });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}.`));