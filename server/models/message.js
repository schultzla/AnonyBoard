var mongoose = require('mongoose');

var Schema = mongoose.Schema;

messageSchema = new Schema({
    author: {type: String},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now},
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Reply'
    }]
});

module.exports = mongoose.model('Message', messageSchema);