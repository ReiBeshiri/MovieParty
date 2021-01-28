import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form valign-wrapper">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      //All'interno di questo codice stiamo utilizzando setMessage() e sendMessage() ...
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} //Quando viene premuta la barra spaziatrice il messaggio viene inviato
    />
    <button className="sendButton btn-flat" onClick={e => sendMessage(e)}><i class="material-icons">send</i></button> 
  </form>
)

export default Input;