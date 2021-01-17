import io from "socket.io-client";
import {
    SET_FRIEND_USERNAME,
    MOVIEPARTY_IS_STARTED,
    SET_ACCEPTED_FRIENDSHIP,
    GENERICMSG,
    PARTY_INVITATION,
    IN_LOBBY,
    NEW_CHAT_MESSAGE,
    SYNCHRONIZE_VIDEO
} from "../actions/types";
import store from "../store";

var socket;
var myusername;

//DA RINOMINARE IL FILE "SocketClient"
export const initSocket = (username) => {
    socket = io({query: "name="+username});
    myusername=username;

    //receive
    socket.on("friendRequest", (data) => {
        console.log("mi è arrivata una richiesta di amicizia da " + data)
        store.dispatch({
            type: SET_FRIEND_USERNAME,
            payload: data
        })
    });

    socket.on("moviePartyInviteReceiver", (data) => {
        console.log("richiesta movieparty da: " + data.sender)
        console.log("room: " + data.room)
        console.log("movieURL: " + data.movieURL)
        store.dispatch({
            type: PARTY_INVITATION,
            payload: data
        })
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

    socket.on("friendRequestAccepted", (data) => {
        console.log("richiesta di amicizia accettata da " + data)
        store.dispatch({
            type: SET_ACCEPTED_FRIENDSHIP,
            payload: data
        })
    });

    socket.on("genericmsg", (data) => {
        console.log("dispatch norification")
        store.dispatch({
            type: GENERICMSG,
            payload: data
        })
    })

    socket.on("receiveChatMessage", (data) => {
        console.log("new message from |" + data.username + "| --> " + data.text)
        store.dispatch({
            type: NEW_CHAT_MESSAGE,
            payload: data
        })
    })

    socket.on("synchronizeParty", data => {
        store.dispatch({
            type: SYNCHRONIZE_VIDEO,
            payload: data
        })
    })

};

/*const acceptMoviePartyInvite = (sender, room) => {
    joinRoom(room)
    sendMoviePartyResponse(sender, true)
}*/

export const sendMoviePartyResponse = (sender, room, response) => {
    if(response){
        joinRoom(room)
        store.dispatch({
            type: IN_LOBBY,
            payload: true
        })
    }
    if(socket !== undefined){
        socket.emit("moviePartyInviteResponse", {requestSender: sender, requestReceiver: myusername, response: response})
    }
}

export const sendMoviePartyInvite = (myUsername, friendUsername, movieURL) => {
    if(socket !== undefined){
        console.log("sender:" + myUsername)
        console.log("receiver:" + friendUsername)
        console.log("movieURL:" + movieURL)
        socket.emit("moviePartyInviteSender", {sender: myUsername, receiver: friendUsername, room: myUsername, movieURL: movieURL})        
    }
}

export const joinRoom = (roomName) => {
    if(socket !== undefined){
        socket.emit("join", {myusername: myusername, room: roomName})
    }
}

export const sendStartParty = (roomName) => {
    if(socket !== undefined){
        socket.emit("startparty", {roomName})
    }
}

export const sendChatMessage = (myUsername, roomName, message) => {
    if(socket !== undefined){
        socket.emit("chatMessage", {username: myUsername, roomName: roomName, message: message})
    }
}

export const synchronizeVideo = (roomName, timestamp, playing) => {
    if(socket !== undefined){
        socket.emit("synchronizeVideo", {roomName: roomName, timestamp: timestamp, playing: playing})
    }
}

export const disconnectSocket = () => {
    if(socket !== undefined){
        socket.emit("remove", myusername)
        socket.disconnect()
        socket.off();
    }
}
