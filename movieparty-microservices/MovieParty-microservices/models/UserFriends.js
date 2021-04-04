const mongoose = require("mongoose");
const conn = require("../configDB/dbManager");
const Schema = mongoose.Schema;

// Create Schema
const UserFriendsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  friends: {
    type: [String]
  }
});

module.exports = UserFriends = conn.friends.model("userfriends", UserFriendsSchema);