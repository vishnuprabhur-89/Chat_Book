var express = require("express");
var Router = express.Router();
var User = require("../controller/controller.js");

Router.post('/signup', User.Signup);
Router.post('/signin', User.Signin);
Router.get('/access', User.access_user_details);
Router.post('/store/chat', User.store_chat_details);
Router.post('/from/and/to', User.from_and_to_users);
Router.post('/chat/backup', User.chat_backup);
Router.post('/update/status', User.chat_hide_person);
Router.post('/notify/update', User.notification);
Router.get("/access/notify/:id", User.access_notify_details);
module.exports = Router;