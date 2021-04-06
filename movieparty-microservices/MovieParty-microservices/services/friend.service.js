"use strict";

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
		newfriendrequest: {
			rest: {
				method: "POST",
				path: "/newfriendrequest",
				params: {
					requester : "string",
                    receiver : "string"
				}
			},
			async handler(ctx) {
                const requester = ctx.params.myUsername;
                const receiver = ctx.params.friendUsername;
                var send = true
                var response = null

                var entity = await ctx.mcall(
                    {
                        requesterIsPresent: {action: 'friend.userIsPresent', params: { name: requester}},
                        receiverIsPresent: {action: 'friend.userIsPresent', params: { name: receiver}}
                    }                                        
                );
                
                if(entity.requesterIsPresent && entity.receiverIsPresent){
                    await FriendRequest.findOne({requester : requester, receiver : receiver, result : 0}).then(req => {
                        if(req !== null){
                            send=false
                            response =  {name: "FriendRequest already in list", message: "FriendRequest already in list"};
                        }
                    })

                    await UserFriends.findOne({name: requester}).then(user => {
                        if(user.friends.includes(receiver)){
                            send=false
                            response = {name: "User already in friends list", message: "User already in friends list"};
                        }
                    })

                    if(send){
                        const newFriendRequest = new FriendRequest({
                            requester: requester,
                            receiver: receiver,
                            result: 0
                        });
                        newFriendRequest.save()
                        //socketio.sendPrivateMessage(receiver, "friendRequest", requester)
                    }
                } else {
                    ctx.meta.$statusCode = 404;
                    response = { name: "User not found", message: "User not found"};
                }
                return response; 
			}
		},
        
        friendrequestlist: {
            rest: {
                method: "GET",
                path: "/friendrequestlist",
                params: {
                    name: "string"
                }
            },
            async handler(ctx) {
                const username = ctx.params.name

                return await FriendRequest.find({receiver: username, result: 0}).then(requests => {

                    var requestJSON = []
                    requests.forEach(request => {
                        var item = {}
                        item["friendUsername"] = request.requester
                        requestJSON.push(item)
                    })
                    return {requests: requestJSON};
                })

            }
        },

        friendresponse: {
            rest: {
                method: "PUT",
                path: "/friendresponse",
                params: {
                    requester: "string",
                    receiver: "string",
                    result: "integer" //number
                }
            },
            async handler(ctx) {
                const requester = ctx.params.requester
                const receiver = ctx.params.receiver
                const result = parseInt(ctx.params.result)

                return await FriendRequest.findOneAndUpdate({ requester: requester, receiver: receiver}, {result: result}).then(request => {
        
                    UserFriends.findOne({ name: requester }).then(user => {
                        user.friends.addToSet(receiver)
                        user.save()
                        //socketio.sendPrivateMessage(myUsername, "friendRequestAccepted", friendUsername)
                    });
            
                    UserFriends.findOne({ name: receiver }).then(user => {
                        user.friends.addToSet(requester)
                        user.save()
                        //socketio.sendPrivateMessage(friendUsername, "friendRequestAccepted", myUsername)
                    });
                });
            }
        },

        friendrlist: {
            rest: {
                method: "GET",
                path: "/friendlist",
                params: {
                    name: "string"
                }
            },
            async handler(ctx) {
                const username = ctx.params.name

                return await UserFriends.findOne({ name: username }).then(user => {
                    // Check if user exists
                    if (!user) {
                        ctx.meta.$statusCode = 404;
                        return { name: "User not found", message: "User not found"};
                    }
            
                    var friendsJSON = []
                    user.friends.forEach(friend => {
                        var item = {}
                        item["username"] = friend
                        //item["online"] = socketio.isOnline(friend)
                        friendsJSON.push(item)
                    });
                    
                    return {friends: friendsJSON};
                });

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
        
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};