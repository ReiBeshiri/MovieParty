"use strict";

const mongoose = require("mongoose");
const dbUsers = require("../configDB/userDBKeys").mongoURI; // DB key Config User database
const dbFriends = require("../configDB/friendDBKeys").mongoURI; // DB key Config Friend database
const dbBadges = require("../configDB/badgeDBKeys").mongoURI;

// Load User model
const User = require("../models/User");
const Friends = require("../models/UserFriends");
const Badges = require("../models/UserBadge");

//component to throw error/badReq/etc
const { MoleculerError } = require("moleculer").Errors;

module.exports = {
	name: "badge",

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
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		getBadgeList: {
			rest: {
				method: "GET",
				path: "/badgelist"
			},
			async handler(ctx) {
                
                //IMPUT DATA
                //myUsername = req.query.username
                var myUsername = "utente1"
                
                var response = null;

                console.log("SERVER - richiesta lista badge")

                Badges.findOne({ username: myUsername }).then(userbadgelist => {
                    // Check if user exists
                    if (!userbadgelist) {
                        response = "userbadge not found"
                        throw new MoleculerRetryableError("User Badge List Not Found", 404, "no data available", {nodeID: "serverNode-NNN" });
                    }
                    console.log(userbadgelist)
                    response = "response badge list";//JSON.parse(userbadgelist);
                });

                return "response badge list";
			}
		},

		updateBadgeList: {
			rest: {
				method: "POST",
				path: "/addbadge",
				params: {
					name : "string"
				}
			},
			async handler(ctx) {
				//req param to be passed
				var bl = req.body.params.badgelist
				var type = parseInt(req.body.params.badgetype)
			
				var myquery = {username: bl.username};
				var newvalues = {$set: { path_: struct }};
				var struct = {
					source: bl.badges[type].source,
					title: bl.badges[type].title,
					description: bl.badges[type].description,
					owned: true
				}

				newvalues = type==0 ? {$set: { "badges.0": struct }} : {$set: { "badges.1": struct }}

				/*if(type==0){
					newvalues = {$set: { "badges.0": struct }}
				} else {
					newvalues = {$set: { "badges.1": struct }}
				}
				
				switch (type) {
					case 0:
						newvalues = {$set: { "badges.0": struct }}
					  break;
					case 1:
						newvalues = {$set: { "badges.1": struct }}
					  break;
				  }*/
			
				Badges.updateOne(myquery, newvalues).then(()=> console.log("Badge update completed"));
					
				return "Badge update completed";
			}
		},
	},

	/**
	 * Events
	 */
	events: {

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