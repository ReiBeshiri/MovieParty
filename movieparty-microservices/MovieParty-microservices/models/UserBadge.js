const mongoose = require("mongoose");
const conn = require("../configDB/dbManager");
const Schema = mongoose.Schema;

// Create Schema
const UserBadgeSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  badges: [
     { source: String, title: String, description: String, owned: Boolean },  //#badge0
     { source: String, title: String, description: String, owned: Boolean }   //#badge1
  ]
});

module.exports = UserBadge = conn.badges.model("userbadges", UserBadgeSchema);