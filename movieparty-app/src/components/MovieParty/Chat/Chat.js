import './Chat.css';
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';
import Messages from './Messages/Messages';
import { sendChatMessage } from "../../../socket/socket";
import {updateBadgeList} from "../../../actions/friendsActions";
import {useNotification} from "../../Notification/NotificationProvider";
import {notification_titles} from "../../Notification/NotificationTitle";

const Chat = (props) => {

  const myusername = props.auth.user.name.split(" ")[0];
  const roomName = props.partystatus.leader;
  const [message, setMessage] = useState(''); 
  const [messages, setMessages] = useState([]); //Per tenere traccia dei messaggi bisogna avere uno stato. Questa istruzione ci permette di tenere traccia di tutti i messaggi. "setMessages" conterrà tutti gli array.
  const dispatch = useNotification();
  const [notifyBadge, setNotifyBadge] = useState(false); 
  
  useEffect(() => {
    if(props.partystatus.lastMessage !== undefined){
      setMessages(messages => [ ...messages, props.partystatus.lastMessage]);
      props.partystatus.lastMessage = undefined
    }
  }, [props.partystatus.lastMessage]);

  const sendMessage = (event) => {
    gamify()
    event.preventDefault(); //Permette di non far refreshare la pagina
    sendChatMessage(myusername, roomName, message)
    setMessages(messages => [...messages, {username: myusername, text: message}])
    setMessage("")
  }

  useEffect(()=>{
    if(notifyBadge){
      //NOTIFY      
      dispatch({
        title: notification_titles.genericmsg,
        type: "BADGE",
        message: {text: "badge 1 unlocked!!!", info: ""},
        myusr: myusername
      })
    }
  },[notifyBadge])

  const gamify = () => {
    //badge1 chat
    if(!props.badges.badge1.owned){
      updateBadgeList(props.badges, "badge1")
      props.badges.badge1.owned=true
      setNotifyBadge(true)
    }
    //END BADGE
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={roomName} />
        <Messages messages={messages} name={myusername} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  partystatus: state.partystatus,
  badges: state.badges
});

export default connect(
  mapStateToProps, 
  {}
)(Chat);