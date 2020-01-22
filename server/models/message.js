var mongoose = require('mongoose');

var Schema = mongoose.Schema;

messageSchema = new Schema({
    author: {type: String, require: true},
    message: {type: String, required: true}
});

module.exports = mongoose.model('Message', messageSchema);