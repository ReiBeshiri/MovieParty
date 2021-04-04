const mongoose = require("mongoose");
const conn = require("../configDB/dbManager");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  }
});

module.exports = User = conn.users.model("users", UserSchema);