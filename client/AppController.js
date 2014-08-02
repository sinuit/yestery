var app = angular.module('train', ['ui.bootstrap', 'angularFileUpload']);

app.controller('AppController', function($http, $rootScope) {
  var that = this;
  that.searchForThoughts = function() {
    $http.get('/thoughts?q=' + that.searchtext).success(function(data, status, header) {
      $rootScope.$emit('thoughts::filtered', data);
    });
  }
});