const mongoose = require("mongoose");
const conn = require("../configDB/dbManager");
const Schema = mongoose.Schema;

/*

STATUS CODE
0 - pending
1 - accepted
2 - rejected

*/

// Create Schema
const FriendRequestSchema = new Schema({
    requester: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    result: {
        type: Number,
        required: true 
    }
});

module.exports = FriendRequest = conn.friends.model("friendrequests", FriendRequestSchema);
