const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserBadgeSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  badge1: { source: String, description: String, owned: Boolean },
  badge2: { source: String, description: String, owned: Boolean }
});

module.exports = UserBadge = mongoose.model("userbadge", UserBadgeSchema);