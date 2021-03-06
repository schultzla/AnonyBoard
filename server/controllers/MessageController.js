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

exports.get_message = function(req, res) {
  db.Message.findById(req.params.id)
  .populate('replies')
  .then(function(dbMessage) {
    res.json(dbMessage)
  })
  .catch(function(err) {
    res.json(err)
  })
};

exports.delete_message = function(req, res) {
  db.Message.deleteOne({_id: req.params.id})
  .then(function(dbMessage) {
    res.json(dbMessage)
  })
  .catch(function(err) {
    res.json(err)
  }) 
}

exports.get_reply = function(req, res) {
  db.Reply.findById(req.params.id)
  .then(function(dbReply) {
    res.json(dbReply)
  })
  .catch(function(err) {
    res.json(err)
  })
}

exports.create_reply = function(req, res, next) {
  try {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      console.log(errors)
      res.status(422).json({ errors: errors.array() });
      return;
    }   
    db.Reply.create(req.body)
      .then(function(dbReply) {
        return db.Message.findOneAndUpdate({ _id: req.params.id }, {$push: {replies: dbReply._id}}, { new: true });
      })
      .then(function(dbMessage) {
        db.Message.findById(req.params.id)
        .populate('replies')
        .then(function(dbMessage) {
          res.json(dbMessage)
        })
        .catch(function(err) {
          res.json(err)
        })
      
      })
      .catch(function(err) {
        res.json(err);
    });
  } catch(err) {
    return next(err)
  }
}

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
  };

exports.validate = (method) => {
    switch (method) {
      case 'create_message': {
       return [ 
          body('message', 'message is too long').isLength({max: 140})
         ]   
      }
      case 'create_reply': {
        return [ 
          body('message', 'message is too long').isLength({max: 140})
         ] 
      }
    }
  }