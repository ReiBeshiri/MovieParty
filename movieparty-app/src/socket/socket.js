import io from "socket.io-client";
import {
    SET_FRIEND_USERNAME,
    MOVIEPARTY_IS_STARTED
} from "../actions/types";
import store from "../store";

var socket;
var myusername;

//DA RINOMINARE IL FILE "SocketClient"
export const initSocket = (username) => {
    socket = io({query: "name="+username});
    myusername=username;

    //receive
    socket.on("friendRequest", (sender) => {
        console.log("mi è arrivata una richiesta di amicizia da " + sender)
        store.dispatch({
            type: SET_FRIEND_USERNAME,
            payload: sender
        })
    });

    socket.on("moviePartyInviteReceiver", (data) => {
        console.log("richiesta movieparty da: " + data.sender)
        console.log("room: " + data.room)
        console.log("movieURL: " + data.movieURL)
        acceptMoviePartyInvite(data.sender, data.room)
        window.history.pushState({sender: data.sender, room: data.room, movieURL: data.movieURL }, "titolo", "/invited")
    })

    socket.on("moviePartyInviteResponse", (data) => {

        var btn = document.getElementById("btn" + data.receiver)

        if(data.accept){
            console.log(data.receiver + " ha accettato")
            btn.innerHTML= "Accettato"
        } else {
            console.log(data.receiver + " ha rifiutato")
            btn.innerHTML= "Rifiutato"
        }
        
    })

    socket.on("partystarted", (data) => {
        console.log("il party è incominciato")
        store.dispatch({
            type: MOVIEPARTY_IS_STARTED,
            payload: true
        })
    })

    socket.on("message", (data) => {
        console.log(data.text)
    });


};

const acceptMoviePartyInvite = (sender, room) => {
    joinRoom(room)
    sendMoviePartyResponse(sender, true)
}

const sendMoviePartyResponse = (sender, response) => {
    socket.emit("moviePartyInviteResponse", {requestSender: sender, requestReceiver: myusername, response: response})
}

export const sendMoviePartyInvite = (myUsername, friendUsername, movieURL) => {
    socket.emit("moviePartyInviteSender", {sender: myUsername, receiver: friendUsername, room: myUsername, movieURL: movieURL})
}

export const joinRoom = (roomName) => {
    socket.emit("join", {myusername: myusername, room: roomName})
}

export const sendStartParty = (roomName) => {
    socket.emit("startparty", {roomName})
}

export const disconnectSocket = () => {
    socket.emit("remove", myusername)
    socket.disconnect()
    socket.off();
}
