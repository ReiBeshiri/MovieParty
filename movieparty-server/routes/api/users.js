const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const UserBadge = require("../../models/UserBadge");
const FriendRequest = require("../../models/FriendRequest");

//Load socket 
const socketio = require('../../socket/socketServer');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            const newUserBadge = new UserBadge({
                username: req.body.name,
                badge1: {source: "badge1", description: "unlock badge 1", owned: false},
                badge2: {source: "badge2", description: "unlock badge 2", owned: false}
            });
            newUserBadge.save()

            //Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
    
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
    
                // Sign token
                jwt.sign(payload, keys.secretOrKey, {
                    expiresIn: 31556926 // 1 year in seconds
                    },(err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                    }
                );

                user.online = true
                user.save()

            } else {
                return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.post("/genericmsg", (req, res) => {
    myUsername = req.body.requester
    friendUsername = req.body.receiver
    console.log("sending private msg from " + myUsername + " to " + friendUsername)
    socketio.sendPrivateMessage(friendUsername, "genericmsg", myUsername)
    return res.status(200).json();
});

router.post("/addfriend", (req, res) => {

    myUsername = req.body.requester
    friendUsername = req.body.receiver

    console.log(myUsername)
    console.log(friendUsername)

    User.findOne({ name: myUsername }).then(myself => {

        if(myself.friends.includes(friendUsername)){
            console.log("User already in friends list")
            return res.status(200).json({ info: "User already in friends list"});
        } 

        User.findOne({ name: friendUsername }).then(user => {

            //If user does not exist, return 404 not found
            if (!user) {
                console.log("nessun utente con questo username")
                socketio.sendPrivateMessage(myUsername, "genericmsg", "user not found")
                return res.status(404).json({ info: "User not found" });
            }

            const newFriendRequest = new FriendRequest({
                requester: myUsername,
                receiver: friendUsername,
                result: 0
            });
            newFriendRequest.save()
            console.log("sending private msg from " + myUsername + " to " + friendUsername)
            socketio.sendPrivateMessage(friendUsername, "friendRequest", myUsername)

            return res.status(200).json();
        });
    });
});

router.get("/friendrequest", (req, res) => {

    console.log("arrivata richiesta di aggiornamento")

    username = req.query.name
    console.log("aggiornamento: " + username)

    FriendRequest.find({receiver: username}).then(requests => {

        requestJSON = []
        requests.forEach(request => {
            item = {}
            item["friendUsername"] = request.requester
            requestJSON.push(item)
        })
        return res.status(200).json({requests: requestJSON});
    })

});

router.put("/friendresponse", (req, res) => {

    myUsername = req.body.requester
    friendUsername = req.body.receiver
    result = parseInt(req.body.result)
    console.log(myUsername)
    console.log(friendUsername)

    console.log("è arrivata la risposta al server --> " + result)

    FriendRequest.findOneAndUpdate({ requester: myUsername, receiver: friendUsername}, {result: result}).then(request => {
        
        User.findOne({ name: myUsername }).then(user => {
            user.friends.addToSet(friendUsername)
            user.save()
            socketio.sendPrivateMessage(myUsername, "friendRequestAccepted", friendUsername)
            console.log("1 aggiunto amico a " + friendUsername)
        });

        User.findOne({ name: friendUsername }).then(user => {
            user.friends.addToSet(myUsername)
            user.save()
            //socketio.sendPrivateMessage(friendUsername, "friendRequestAccepted", myUsername)
            //console.log("2 aggiunto amico a " + myUsername)
        });
        //Bisogna fare una socket al client che ha creato la richiesta dicendogli il risultato
        return res.status(200).json();
    });

});

router.get("/friendlist", (req, res) => {

    myUsername = req.query.name

    console.log(myUsername)
    console.log("SERVER - richiesta lista di amici")

    User.findOne({ name: myUsername }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        friendsJSON = []
        user.friends.forEach(friend => {
            item = {}
            item["username"] = friend
            item["online"] = socketio.isOnline(friend)
            friendsJSON.push(item)
        });
        
        return res.status(200).json({friends: friendsJSON});
    });
});

router.get("/badgelist", (req, res) => {

    myUsername = req.query.username

    console.log(myUsername)
    console.log("SERVER - richiesta lista badge")

    UserBadge.findOne({ username: myUsername }).then(userbadgelist => {
        // Check if user exists
        if (!userbadgelist) {
            return res.status(404).json({ badgenotfound: "Badge not found" });
        }
        
        return res.status(200).json(userbadgelist);
    });
});

router.put("/addbadge", (req, res) => {
    var bl = req.body.params.badgelist
    var type = req.body.params.badgetype

    var myquery = {username: bl.username};
    var newvalues;
    //badge2: { source: String, description: String, owned: Boolean }
    switch (type) {
        case "badge1":
            //badge 1 set up values
            newvalues = {$set: { "badge1": {
                source: bl.badge1.source,
                description: bl.badge1.description,
                owned: true
            } }}
          break;
        case "badge2":
            //badge 2 set up values
            newvalues = {$set: { "badge2": {
                source: bl.badge2.source,
                description: bl.badge2.description,
                owned: true
            } }}
          break;
      }

    UserBadge.updateOne(myquery, newvalues).then(()=> console.log("update badge completed"))
        
    return res.status(200).json();
});

router.put("/logout", (req, res) => {

    myUsername = req.body.name
    User.findOne({ name: myUsername }).then(user => {
        user.online = false;
        user.save()
        return res.status(200).json();
    });

});
  
module.exports = router;