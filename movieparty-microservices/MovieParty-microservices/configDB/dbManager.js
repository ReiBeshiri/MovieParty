/**
 * Manager to get multiple connection settup with Mongoose.
 * There are 3 main connections:
 *  -dbBadges
 *  -dbUsers
 *  -dbFriends
 */

const mongoose = require('mongoose');
const dbBadges = require("./badgeDBKeys").mongoURI;
const dbUsers = require("./userDBKeys").mongoURI;
const dbFriends = require("./friendDBKeys").mongoURI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 60000, // Close sockets after 60 seconds of inactivity
  };

    /**
     * dbBadges connection
     */
    try {
    mongoose.badges = mongoose.createConnection(dbBadges, options)
    } catch (error) {
    //print possible connection error
    console.error(error);
    }

    /**
     * dbUsers connection
     */
    try {
    mongoose.users = mongoose.createConnection(dbUsers, options)
    } catch (error) {
    //print possible connection error
    console.error(error);
    }

    /**
     * dbFriends connection
     */
    try {
    mongoose.friends = mongoose.createConnection(dbFriends, options)
    } catch (error) {
    //print possible connection error
    console.error(error);
    }

module.exports = mongoose;