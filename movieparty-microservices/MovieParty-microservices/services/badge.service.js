"use strict";

const mongoose = require("mongoose");
/*const dbUsers = require("../configDB/userDBKeys").mongoURI; // DB key Config User database
const dbFriends = require("../configDB/friendDBKeys").mongoURI; // DB key Config Friend database
const dbBadges = require("../configDB/badgeDBKeys").mongoURI;*/

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
				path: "/badgelist",
				params: {
					username: "string",
				}
			},
			async handler(ctx) {
                
                var username = ctx.params.username;

                return await Badges.findOne({ username: username }).then(userbadgelist => {
                    // Check if user exists
                    if (!userbadgelist) {
                        response = "userbadge not found"
                        throw new MoleculerRetryableError("User Badge List Not Found", 404, "no data available", {nodeID: "serverNode-NNN" });
                    }
                    console.log(userbadgelist)
					return userbadgelist;                    
                });

			}
		},

		updateBadgeList: {
			rest: {
				method: "POST",
				path: "/updateBadgeList",
				params: {
					badgetype : "string",
					badgelist : "string"
				}
			},
			async handler(ctx) {				

				var bl = ctx.params.badgelist
				var type = parseInt(ctx.params.badgetype)
				if(type>1){
					ctx.meta.$statusCode = 400;//Bad Request
					return {
						name: "Bad Request",
						message: "Not existing badgetype",
						code: ctx.meta.$statusCode
					};
				}
				
				var myquery = {username: bl.username};
				var newvalues = {$set: { path_: struct }};
				var struct = {
					source: bl.badges[type].source,
					title: bl.badges[type].title,
					description: bl.badges[type].description,
					owned: true
				}

				newvalues = type==0 ? {$set: { "badges.0": struct }} : {$set: { "badges.1": struct }}

				return await 
				Badges.findOne({ username: bl.username }).then(userbadgelist => {
                    // Check if user exists
                    if (!userbadgelist) {
						ctx.meta.$statusCode = 404;//No Data Available
                        //return new MoleculerError("User Badge List Not Found", 404, "No Data Available", {nodeID: ctx.nodeID });						
						return {
							name: "No Data Available",
							message: "No Badgelist Found",
							code: ctx.meta.$statusCode
						};
                    }else{
						Badges.updateOne(myquery, newvalues).then(()=> {
							console.log("Badge Update Completed");
							return "Badge Update Completed";
						});
					}               
                });			
							
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