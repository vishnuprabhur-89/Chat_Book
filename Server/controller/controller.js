const bcrypt = require("bcrypt");
const Models = require('../models/models.js');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const fs = require("fs");
var chatbackup = require("../chat_backup.json");

exports.Signup = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        else {
            Models.User.findOne({ emailid: req.body.emailid })
                .then(function (result) {
                    if (null != result) {
                        res.status(401).json({ error: "Email already exists" })
                    }
                    else if (req.body.password.lenght === 0) {
                        res.status(401).json({ error: "Password should not be empty." })
                    }
                    else {
                        const user = new Models.User({ _id: new mongoose.Types.ObjectId(), userid: req.body.userid, emailid: req.body.emailid, password: hash });
                        user.save()
                        const history = new Models.History({ _id: new mongoose.Types.ObjectId(), emailid: req.body.emailid, chats: [] })
                        history.save()
                        res.status(200).json({ success: "users details as been saved." })
                    }
                });
        }
    })
};

exports.Signin = function (req, res) {
    if (req.body.emailid === '' || req.body.password === '') {
        res.status(401).json({
            error: "username and password should not be empty"
        })
    }
    else {
        Models.User.findOne({ emailid: req.body.emailid })
            .exec()
            .then(function (user) {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result) {
                        const JWTToken = jwt.sign({ emailid: user.emailid, _id: user._id }, 'secret', { expiresIn: '1h' });
                        return res.status(200).json({
                            emailid: user.emailid,
                            userid: user.userid,
                            token: JWTToken,
                        });

                    }
                    return res.status(401).json({ failed: 'Unauthorized Access' });
                })
            })
            .catch(error => { res.status(500).json({ error: "no user is avaiable" }) });
    }
};

exports.access_user_details = function (request, response) {
    Models.User.find()
        .then(users => response.json(users))
        .catch(err => response.status(400).json('Error: ' + err));
}

exports.store_chat_details = function (request, response) {
    var query = { _id: new mongoose.Types.ObjectId(), from: request.body.from, to: request.body.to, message: request.body.message };
    const Chats = new Models.Chat(query);
    Chats.save()
        .then(item => {
            Models.History.updateMany({ emailid: { $in: [request.body.from, request.body.to] } }, { $push: { chats: query._id } })
                .then(res => {
                    response.send({ message: "value are pushed" });
                })
        })
}

exports.from_and_to_users = function (request, response) {
    Models.History.find({ emailid: request.body.from }, function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            Models.Chat.find({ _id: { $in: result[0].chats } })
            .then(user1 => {
                user1 = user1.filter(function(e){
                    return e.from === request.body.from && e.to === request.body.to || e.from === request.body.to && e.to === request.body.from
                })
                response.status(200).send(user1)
            })
            .catch(err => response.status(400).json('Error: ' + err));
        }
    })
}

exports.chat_backup = function (request, response) {
    Models.Chat.find({ from: request.body.username })
        .then(user1 => {
            Models.Chat.find({ to: request.body.username })
                .then(user2 => {
                    user1.push.apply(user1, user2)
                    chatbackup = []
                    chatbackup.push(user1);
                    fs.writeFile("chat_backup.json", JSON.stringify(chatbackup), err => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            response.status(200).send({ message: "chat are backup success" })
                        }
                    });
                })
        })
        .catch(err => response.status(400).json('Error: ' + err));
}

exports.chat_hide_person = function (request, response) {
    Models.History.update({ emailid: request.body.from }, { $set: { chats: [] } })
        .then(user => { response.status(200).send({message:"successfully rested"}) })
        .catch(err => response.status(400).json('Error: ' + err));
}

exports.notification = function(request, response){
    var value = new Models.Notification(request.body)
    value.save()
    .then(res => {
        response.status(200).send({message:"stored!"})
    })
}

exports.access_notify_details = function (request, response) {
    Models.Notification.find({emailid: request.params.id})
        .then(users => response.json(users))
        .catch(err => response.status(400).json('Error: ' + err));
}