var path = require('path');

var express = require('express'),
    bodyParser = require('body-parser'),
    multer  = require('multer');

var thoughts = require('./thoughts'),
    files = require('./files');

var clientDirectory = path.join(__dirname, '..', 'client'),
    uploadDirectory = path.join(__dirname, '..', 'client', 'uploads');

var server = {
  start: function() {
    var app = express();
    app.use(bodyParser.json());
    app.use(express.static(clientDirectory));
    app.use(multer({
      dest: uploadDirectory,
      rename: function (fieldname, filename) {
        var now = new Date(),
            prefix = now.getFullYear() + '_' + (now.getMonth()+1) + '_' + now.getDate() + '__'  + now.getHours() + '_' + now.getMinutes()+ '_';
        return prefix + filename.replace(/\W+/g, '-').toLowerCase();
      }
    }));

    app.post('/file', function(req, res) {
      if(req.files && req.files.file) {
        res.json(files.toJson(req.files.file.path));
      }
    });

    app.post('/thought', function(req, res) {
      var thought = {
        title: req.body.title,
        description: req.body.description
      };
      var attachedFiles = req.body.attachedFiles;

      if (attachedFiles) {
        thought.files = attachedFiles;
      }

      thoughts.add(thought, function (err, savedThought) {
        if (err) {
          return res.json({ error: 'Could not save your thought.'});
        }
        res.json(savedThought);
      });
    });

    app.get('/thoughts', function(req, res) {
      var query = {};
      if (req.query.q) {
        query = { $or: [
          { title: new RegExp(req.query.q) }, 
          { description: new RegExp(req.query.q) }
        ]};
      }
      thoughts.find(query, function (err, thoughts) {
        if (err) {
          return res.json({error: 'Could not find any documents.'})
        }
        res.json(thoughts);
      });
    });

    var httpServer = app.listen(3000, function() {
      console.log('Listening on port %d', httpServer.address().port);
    });
  }
};

module.exports = server;