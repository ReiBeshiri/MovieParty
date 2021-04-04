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
		getUserByName: {
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

		getbodyparams: {
			rest: {
				method: "GET",
				path: "/addbadge",
				params: {
					name : "string"
				}
			},
			async handler(ctx) {
				return "Hello Moleculer: " + ctx.params.name;
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
        /*// Connect to MongoDB as soon as the service is up
        mongoose.connect(dbBadges, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Badges successfully connected"))
        .catch(err => console.log(err))*/
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};