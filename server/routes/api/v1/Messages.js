var express = require('express');
var messagesRouter = express.Router();
var Message = require('../../../models/message');
var message_controller = require('../../../controllers/MessageController');

messagesRouter.route('/')
    .get(message_controller.message_list)
    .post(message_controller.validate('create_message'), message_controller.create_messsage);

module.exports = messagesRouter;