const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/UserPosts')

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    age: Number,

    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);