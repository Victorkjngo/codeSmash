var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    'id': String,
    'email': String,
    'hash': String,
    'oauth_id': String,
    'image_url': String,
    'url': String,
    'first_name': String,
    'last_name': String,
    'company': String,
    'title': String,
    'location': {
      'city': String,
      'state': String
    },
    'interviews': [
      {
        'state':
        'date': { type: Date, default: Date.now },
        'start_time': String,
        'room_url': String,
        'interviewee': String,
        'code': [
          {
            'time': String,
            'code_snippet': String
          }
        ],
        'notes': String,
        'email': String
      }
    ]
  }
);

var Users = mongoose.model('Users', userSchema);

var selectAll = (callback) => {
  Users.find({}, (err, users) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};

var select = (callback) => {
  Users.find(callback, (err, users) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, users)
    }
  })
}

module.exports = Users;
module.exports.selectAll = selectAll;