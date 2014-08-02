angular.module('train').controller('AddThoughtFormController', function($http, $scope, $rootScope, $upload) {
  var that = this;
  that.title = '';
  that.files = [];

  that.dragClass = function ($event) {
    return $event.type;
  };

  that.isDisabled = function () {
    return !that.title || that.title.length === 0;
  };

  that.filesDropped = function ($files) {
    if ($files.length !== 1) {
      return;
    }
    $scope.upload = $upload.upload({
      url: '/file',
      method: 'POST',
      file: $files[0]
    }).progress(function(evt) {
      console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    }).success(function(data, status, headers, config) {
      that.files.push(data);
    });
  };

  that.addThought = function () {
    var newThought = {
      title: that.title,
      description: that.description,
      attachedFiles: that.files
    };
    var options = {
      headers: {'Content-Type': 'application/json'}
    } 
    $http.post('/thought', newThought, options).success(function(data, status, header) {
      $rootScope.$emit('thought::added', data);
      that.reset();
    });
  };

  that.reset = function () {
    that.files = [];
    that.title = '';
    that.description = '';
  };
});
