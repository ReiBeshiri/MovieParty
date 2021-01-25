const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserBadgeSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  badges: [
     { source: String, description: String, owned: Boolean },
     { source: String, description: String, owned: Boolean }
  ]
});

module.exports = UserBadge = mongoose.model("userbadge", UserBadgeSchema);