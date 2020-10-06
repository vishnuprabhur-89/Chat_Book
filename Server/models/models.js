const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userid: { type: String, required: true, unique: true },
    emailid: { type: String, required: true, unique: true },
    password: { type: String },
}, {
    timestamps: true,
});

const chatSchema = new Schema({
    from: { type: String },
    to: { type: String },
    message: { type: String, null: true }
}, {
    timestamps: true,
});

const userChatDetails = new Schema({
    emailid: { type: String, required: true, unique: true },
    chats: { type: Array }
})

const notification = new Schema({
    emailid: { type: String },
    from: { type: String },
    to: { type: String }
}, {
    timestamps: true,
})

const Users = mongoose.model('user_table', userSchema);
const Chats = mongoose.model('chat_table', chatSchema);
const Historys = mongoose.model('user_chat_table', userChatDetails);
const Notifications = mongoose.model('notify', notification);

module.exports = {
    User: Users,
    Chat: Chats,
    History: Historys,
    Notification: Notifications
};