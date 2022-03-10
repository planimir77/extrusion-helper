const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const shoppinglistSchema = new mongoose.Schema({
    shoppinglistName: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    subscribers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        type: ObjectId,
        ref: "Item"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Shoppinglist', shoppinglistSchema);
