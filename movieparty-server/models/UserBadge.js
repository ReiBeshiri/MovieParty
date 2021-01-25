const mongoose = require("mongoose");
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

module.exports = UserBadge = mongoose.model("userbadge", UserBadgeSchema);