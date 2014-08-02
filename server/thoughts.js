var Datastore = require('nedb'),
    db = new Datastore({ filename: 'data/thoughts.db', autoload: true });

var thoughts = {};

thoughts.add = function (data, callback) {
  data.createdAt = new Date();
  db.insert(data, callback);
};

thoughts.find = function (query, callback) {
  db.find(query).sort({createdAt: -1}).exec(callback);
};

module.exports = thoughts;