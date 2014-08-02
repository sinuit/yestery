angular.module('train').controller('ThoughtListController', function($rootScope, $scope, $http) {
  var that = this;
  that.entries = [];

  $http.get('/thoughts').success(function(data, status, header) {
    that.entries = data;
  });

  $rootScope.$on('thought::added', function(event, newThought) {
    that.entries.unshift(newThought);
  });

  $rootScope.$on('thoughts::filtered', function(event, newThoughts) {
    that.entries.length = 0;
    for (var i = newThoughts.length - 1; i >= 0; i--) {
      that.entries.push(newThoughts[i]);
    };
  });
});