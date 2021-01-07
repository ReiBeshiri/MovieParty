import io from "socket.io-client";
import {
    SET_FRIEND_USERNAME
} from "../actions/types";
import store from "../store";

var socket;
var myusername;

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
        console.log(store.getState())
    });

};

export const disconnectSocket = () => {
    socket.emit("remove", myusername)
    socket.disconnect()
    socket.off();
}
