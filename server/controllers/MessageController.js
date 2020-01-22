var db = require('../index');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.message_list = function(req, res) {
    db.Message.find({})
    .then(function(dbMessages) {
      res.json(dbMessages);
    })
    .catch(function(err) {
      res.json(err);
    })
};

exports.create_messsage = function(req, res, next) {
    try {
      const errors = validationResult(req); 

      if (!errors.isEmpty()) {
        console.log(errors)
        res.status(422).json({ errors: errors.array() });
        return;
      }   
      db.Message.create(req.body)
        .then(function(dbMessage) {
          res.json(dbMessage);
        })
        .catch(function(err) {
          res.json(err);
      });
    } catch(err) {
      return next(err)
    }
  }

exports.validate = (method) => {
    switch (method) {
      case 'create_message': {
        console.log('validating new message')
       return [ 
          body('message', 'message is too long').isLength({max: 140})
         ]   
      }
    }
  }