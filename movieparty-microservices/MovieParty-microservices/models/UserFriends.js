const mongoose = require("mongoose");
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

module.exports = UserFriends = mongoose.model("userfriends", UserFriendsSchema);