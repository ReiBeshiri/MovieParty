//Utilizzeremo la libreria hooks (una nuova aggiunta di React) che consente di non avere più dei Dummy components,
//ma di utilizzare uno stato e un lifeclycle methods all'interno del componente.
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

const Join = () => {
    //stiamo dichiarando hooks all'interno di un componente.
    //questa costante è un array, in cui il primo parametro è una variabile e il secondo argomento è una setter function
    const [name, setName] = useState(''); //all'interno di useState viene definito il valore iniziale che avrà la variabile "name"
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div> {/*event.target.value permette di ricavare il valore inserito in input*/}
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                {/*
                    Quando clicco sul bottone mi sposto nella pagina "/chat" e specifico il valore di name e rooom
                    Viene però effettuato il controllo che siano presenti sia il nome del partecipante che della stanza (!name || !room), nel caso uno
                    dei due non sia presente il bottone non fa niente (e.preventDefault())
                */}
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}> {/* Per evitare che nel link vengano visualizzate queste informazioni bisogna usare le Props */ }
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;