"use strict";

const mongoose = require("mongoose");
const dbUsers = require("../configDB/userDBKeys").mongoURI; // DB Config
const dbFriends = require("../configDB/friendDBKeys").mongoURI; // DB Config

// Load User model
const User = require("../models/User");
const Friends = require("../models/UserFriends");
const Badges = require("../models/UserBadge");

module.exports = {
	name: "prova",

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
				path: "/getuserbyname"
			},
			async handler() {
                User.findOne({ name: "utente1" }).then(usr => {
                    console.log(usr)
                })
				return "Hello Moleculer";
			}
		},

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		 getFriendsByName: {
			rest: {
				method: "GET",
				path: "/getfriendsbyname"
			},
			async handler() {
                Friends.findOne({ name: "utente1" }).then(usr => {
                    console.log(usr)
                })
				return "Hello Moleculer";
			}
		},

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		 getBadgesByName: {
			rest: {
				method: "GET",
				path: "/getbadgesbyname"
			},
			async handler() {
                Badges.findOne({ name: "utente1" }).then(usr => {
                    console.log(usr)
                })
				return "Hello Moleculer";
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
        // Connect to MongoDB
        mongoose.connect(dbUsers, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Users successfully connected"))
        .catch(err => console.log(err))
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};