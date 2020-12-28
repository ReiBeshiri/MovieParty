import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState(''); 
    const [messages, setMessages] = useState([]); //Per tenere traccia dei messaggi bisogna avere uno stato. Questa istruzione ci permette di tenere traccia di tutti i messaggi. "setMessages" conterrà tutti gli array.
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        //location è una Props data da React Router
        //const {name, room} = queryString.parse(location.search); //Mette i valori specificati nell'URL nella variabile name e nella variabile room

        socket = io(ENDPOINT); //Gli stiamo passando l'endpoint con cui dovrà comunicare, sostanzialmente l'indirizzo del server.

        //setName(name);
        //setRoom(room);
        setName("Rei")
        setRoom("prova")

        console.log(socket)

        socket.emit('join', { name, room }, (/*{error}*/) => { /*Come terzo parametro è possibile specificare una funzione che verrà eseguita quando verrà effettuata la callback lato server */
          /*if(error) {
            alert(error);
          }*/
        });

        return () => {
          socket.emit('disconnect');
          socket.off();
        }

    }, [ENDPOINT]); //Solamente se questi due parametri verrano modificati allora verrà eseguito questo effetto
    
    useEffect(() => {
      socket.on('message', (message) => {
        setMessages([ ...messages, message]);
        //setMessages(messages => [ ...messages, message ]); //Permette di aggiungere ogni messaggio che arriva all'array di messaggi ricevuti.
      });
      
      /* socket.on("roomData", ({ users }) => {
        setUsers(users);
      }); */
    }, [messages]);

    const sendMessage = (event) => {
      event.preventDefault(); //Permette di non far refreshare la pagina
  
      if(message) {
        socket.emit('sendMessage', message, () => setMessage('')); /* Come callback da eseguire, elimina il testo dal componente "input" in cui era stato scritto il messaggio */
      }
    }

    console.log(message, messages);

    return (
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        {/*<TextContainer users={users}/>*/}
      </div>
    );
}

export default Chat;