var path = require('path');

var clientDirectory = path.join(__dirname, '..', 'client'),
    uploadDirectory = path.join(__dirname, '..', 'client', 'uploads');

var files = {
  toJson: function (filepath) {
    var extension = path.extname(filepath).toLowerCase();
    return {
      type: extension.replace('.', ''),
      url: filepath.replace(clientDirectory, ''),
      name: path.basename(filepath)
    };
  }
};

module.exports = files;