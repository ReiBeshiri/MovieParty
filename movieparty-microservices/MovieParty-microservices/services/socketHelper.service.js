"use strict";

//component to throw error/badReq/etc
const { MoleculerError } = require("moleculer").Errors;

const express = require("express");
const http = require('http');

const app = express();
const server = http.createServer(app);
const usernameSocketId = new Map();//serve per mappare username a socket id
var io;

module.exports = {
	name: "socketHelper",

	/**
	 * Settings
	 */
	settings: {
		
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
        /**
         * Checks if a user is online socket server side.
         */
        isUserOnline(ctx){
            return usernameSocketId.has(ctx.params.username)
        }
	},

	/**
	 * Events
	 */
	events: {
        "socketHelper.sendPrivateMessage": {
            params: {
                receiverUser: "string",
                eventName:  "string",
                data:  "string",
            },
            handler(ctx){
                const receiverUser = ctx.params.receiverUser
                const eventName = ctx.params.eventName
                const data = ctx.params.data

                if(usernameSocketId.has(receiverUser)){ //send the real-time request if the receiver is online.
                    console.log("sending the message")
                    let usr = usernameSocketId.get(receiverUser)
                    io.to(usr).emit(eventName, data);
                    console.log("Private message "+ eventName +" sent to " + data + " from "+ receiverUser)
                }
            }
        }
	},

	/**
	 * Methods
	 */
	methods: {
        /**
         * Starts a new socket server istance
         * @param {httpServer} server 
         */
        startServerSocket(server){
    
            io = require("socket.io")(server, {
                cors: {
                  origin: "http://localhost:3000",
                  methods: ["GET", "POST"]
                }
            });
        
            io.on('connection', (socket) => {
                
                if(!(socket.handshake.query.name === undefined))
                    usernameSocketId.set(socket.handshake.query.name, socket.id);
        
                usernameSocketId.forEach((v,k) => {
                    console.log("v: " + v +", k: " + k)
                })
        
                console.log('We have a new connection!!');
                console.log("nome utente: " + socket.handshake.query.name + ", id:" + socket.id)
            
                socket.on('join', (data) => { 
                    console.log("entra nella stanza |" + data.room + "|: " + data.myusername)
                    socket.join(data.room) //FORSE BISOGNA FARE ANCHE IL CONTRARIO DELLA JOIN, quando un utente lascia il party
        
                    socket.emit('message', { user: 'admin', text: `${data.myusername}, welcome to room ${data.room}.`});
                    socket.broadcast.to(data.room).emit('message', { user: 'admin', text: `${data.myusername} has joined!`});
                });
        
                socket.on('leave', (data) =>{
                    socket.leave(data.room)
                    console.log("sono uscito dalla stanza |" + data.room)
                })
        
                socket.on('moviePartyInviteSender', (data)=>{
                    console.log("movieparty invito: " + data.sender + " " + data.receiver + ", movieURL:" + data.movieURL)
                    sendPrivateMessage(data.receiver, "moviePartyInviteReceiver", {sender: data.sender, room: data.room, movieURL: data.movieURL})
                })
        
                socket.on("moviePartyInviteResponse", (data)=>{
                    console.log("movieparty risposta: " + data.requestReceiver + " " + data.response)
                    sendPrivateMessage(data.requestSender, "moviePartyInviteResponse", {receiver: data.requestReceiver, accept: data.response})
                })
        
                socket.on("startparty", ({roomName})=> {
                    console.log(roomName + " incomincia il party")
                    socket.broadcast.to(roomName).emit("partystarted", {})
                })
        
                socket.on("chatMessage", (data) => {
                    console.log("from: " + data.username + " to: " + data.roomName + " --> " + data.message)
                    socket.broadcast.to(data.roomName).emit("receiveChatMessage", {username: data.username, text: data.message})
                })
        
                socket.on("synchronizeVideo", (data) => {
                    console.log("synchronizing party to timestamp: " + data.timestamp, " playing: "+data.playing)
                    socket.broadcast.to(data.roomName).emit("synchronizeParty", data)
                })
        
                socket.on('remove', username => {
                    console.log("user disconnected " + username + socket.id)
                    usernameSocketId.delete(username)
                    usernameSocketId.forEach((v,k) => {
                        console.log("v: " + v +", k: " + k)
                    })
        
                })
            
                socket.on('disconnect', () => {})
            });
        
        },
        /**
         * Close server socket istance
         */
        closeServerSocket(){
            io.close();
        }
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {            
        try{
            this.startServerSocket(server)
        } catch (err) {
            console.log(err)
            throw new MoleculerError("Server socket internal error", 500, "starting server socket internal error", {nodeID: this.broker.nodeID });
        }
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
        try{
            this.closeServerSocket()
        } catch (err) {
            console.log(err)
            throw new MoleculerRetryableError("Server socket internal error", 500, "closing server socket internal error", {nodeID: this.broker.nodeID });
        }
	}
};