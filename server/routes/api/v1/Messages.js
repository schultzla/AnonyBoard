var express = require('express');
var messagesRouter = express.Router();
var Message = require('../../../models/message');
var Reply = require('../../../models/reply');
var message_controller = require('../../../controllers/MessageController');

messagesRouter.route('/')
    .get(message_controller.message_list)
    .post(message_controller.validate('create_message'), message_controller.create_messsage);

messagesRouter.route('/:id')
    .get(message_controller.get_message)
    .delete(message_controller.delete_message) 

messagesRouter.route('/replies/:id')
    .get(message_controller.get_message)
    .post(message_controller.validate('create_reply'), message_controller.create_reply);

module.exports = messagesRouter;