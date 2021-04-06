"use strict";

const mongoose = require("mongoose");
const dbFriends = require("../configDB/friendDBKeys").mongoURI; // DB Config

// Load User model
const UserFriends = require("../models/UserFriends");
const FriendRequest = require("../models/FriendRequest");

module.exports = {
	name: "friend",

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
		addfriend: {
			rest: {
				method: "POST",
				path: "/addfriend",
				params: {
					myUsername : "string",
                    friendUsername : "string"
				}
			},
			async handler(ctx) {
                const myUsername = ctx.params.myUsername;
                const friendUsername = ctx.params.friendUsername;
                var send = true
                var response = null

                var entity = await ctx.mcall(
                    {
                        requesterIsPresent: {action: 'friend.userIsPresent', params: { name: myUsername}},
                        receiverIsPresent: {action: 'friend.userIsPresent', params: { name: friendUsername}}
                    }                                        
                );
                
                if(entity.requesterIsPresent && entity.receiverIsPresent){
                    FriendRequest.findOne({requester : myUsername, receiver : friendUsername, result : 0}).then(req => {
                        if(req !== null){
                            console.log("FriendRequest already in list")
                            send=false
                            response =  'info: "FriendRequest already in list"';
                        }
                    })

                    UserFriends.findOne({name: myUsername}).then(user => {
                        if(user.friends.includes(friendUsername)){
                            console.log("User already in friends list")
                            send=false
                            response = 'info: "User already in friends list"';
                        }
                    })

                    if(send){
                        const newFriendRequest = new FriendRequest({
                            requester: myUsername,
                            receiver: friendUsername,
                            result: 0
                        });
                        newFriendRequest.save()
                        console.log("sending private msg from " + myUsername + " to " + friendUsername)
                        //socketio.sendPrivateMessage(friendUsername, "friendRequest", myUsername)
                    }

                } else {
                    ctx.meta.$statusCode = 404;
                    response = 'info: "User not found"';
                }

                return response;

                
			}
		},

        async userIsPresent(ctx) {
            return await UserFriends.findOne({ name: ctx.params.name }).then(user => { 
                return !user? false : true;
            });    
        }
	},

	/**
	 * Events
	 */
	events: {
        "friend.newuser"(name) {
            this.logger.info(name);

            const newUserFriend = new UserFriends({
                name: name
            });

            newUserFriend.save();
        }
	},

	/**
	 * Methods
	 */
	methods: {

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
        // Connect to MongoDB
        /*mongoose.connect(dbFriends, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Friend successfully connected"))
        .catch(err => console.log(err))*/
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};