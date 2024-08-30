const mongoose = require('mongoose');
const { Schema } = mongoose;

const exchangeSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    senderBook: {
        type: Schema.Types.ObjectId,
        ref:'Book',
        required: true,
    },
     receiverBook: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    }
},{timestamps: true});

module.exports = mongoose.model('ExchangeRequest', exchangeSchema);
