angular.module('userService', [])

.factory('User', function($http) {

  // crear un nuevo objeto
  var userFactory = {};

  // llamar sólo un usuario
  userFactory.get = function(id) {
    return $http.get('/api/users/' + id);
  };

  // llamar todos los usuarios
  userFactory.all = function() {
    return $http.get('/api/users/');
  };

  // crear un usuario
  userFactory.create = function(userData) {
    return $http.post('/api/users/' + userData);
  };

  // actualizar usuario
  userFactory.update = function(id, userData) {
    return $http.put('/api/users/' + id, userData);
  };

  // eliminar usuario
  userFactory.delete = function(id) {
    return $http.delete('/api/users' + id);
  };

  // return todo el objeto userFactory
  return userFactory;

});
