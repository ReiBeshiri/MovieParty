import axios from "axios";

export const genericmsg = (myUsername, friendUsername) => {

    const newFriendRequest = {
        requester: myUsername,
        receiver: friendUsername
    };

    axios
    .post("/api/users/genericmsg", newFriendRequest)
    .then(res => {
        console.log("richiesta inviata al server") 
    })
    .catch(err => {
        //TODO --> guardare come si restituisce lo status e le info
        console.log(err)
        console.log(err.statusCode)
    });
}


export const friendRequest = (myUsername, friendUsername) => {

    const newFriendRequest = {
        requester: myUsername,
        receiver: friendUsername
    };

    axios
    .post("/api/users/addfriend", newFriendRequest)
    .then(res => {
        console.log("richiesta inviata al server") 
    })
    .catch(err => {
        //TODO --> guardare come si restituisce lo status e le info
        console.log(err)
        console.log(err.statusCode)
    });
}

export const friendResponse = (myUsername, friendUsername, response) => {

    const friendRequestResult = {
        requester: friendUsername,
        receiver: myUsername,
        result: response
    };

    console.log("richiesta accettata, invio al server")

    axios
    .put("/api/users/friendresponse", friendRequestResult)
    .then(res => {
        console.log("risposta inviata al server") 
    })
    .catch(err => {
        //TODO --> guardare come si restituisce lo status e le info
        console.log(err)
        console.log(err.statusCode)
    });
}

export const friendList = (myUsername) => {

    /*axios
    .get("/api/users/friendlist", { params: {
        name: myUsername
    }})
    .then(res => {
        console.log("mi è arrivata la lista degli amici") 
        console.log(res.data)
        return res;
    })
    .catch(err => {
        //TODO --> guardare come si restituisce lo status e le info
        console.log(err)
        console.log(err.statusCode)
    });*/
    const promise = axios.get("/api/users/friendlist", { params: { name: myUsername }})
    const dataPromise = promise.then((response) => response.data)
    
    return dataPromise
}