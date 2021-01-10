import io from "socket.io-client";
import {
    SET_FRIEND_USERNAME,
    SET_ACCEPTED_FRIENDSHIP,
    GENERICMSG,
} from "../actions/types";
import store from "../store";

var socket;
var myusername;

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
        console.log(store.getState())
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

};

export const disconnectSocket = () => {
    socket.emit("remove", myusername)
    socket.disconnect()
    socket.off();
}
