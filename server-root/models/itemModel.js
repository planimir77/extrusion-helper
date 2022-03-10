const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    subscribers: [{
        type: ObjectId,
        ref: "Shoppinglist"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    shoppinglists:[ {
        type: ObjectId,
        ref: "Shoppinglist"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Item', itemSchema);
