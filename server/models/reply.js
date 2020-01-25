var mongoose = require('mongoose');

var Schema = mongoose.Schema;

replySchema = new Schema({
    message: {type: String, required: true},
    author: {type: String},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Reply', replySchema);