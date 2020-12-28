import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

/* Questo componente visualizza tutti i messaggi */
/* Inoltre permette di andare a visualizzare l'ultimo messaggio che è arrivato (nel caso in cui ci si trovi più in alto nella chat) */
const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;