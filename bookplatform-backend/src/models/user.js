const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    ownedBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    wantedBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
