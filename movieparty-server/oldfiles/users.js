const users = [];

const addUser = ({ id, name, room }) => {
    
    name = name.trim().toLowerCase(); //la funzione trim() rimuove gli spazi bianchi (nel caso ci siano) presenti nella stringa contenuta nella variabile name
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name); //Controlla se un utente sta accedendo alla stanza con lo stesso nome di un altro utente già presente

    if(existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room };

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
  
    if(index !== -1) return users.splice(index, 1)[0]; //TODO: Bisogna capire bene cosa fa la funzione "splice"
  }

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom }; //Per poter utilizzare queste funzioni anche all'esterno di questo file.

