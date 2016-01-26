angular.module('authService', [])
//=====================
// auth factory para hacer el login y jalar la info
// inyectar $http para comunicarse con el API
// inyectar $q para devolver los objetos prometidos
// inyectar AuthToken para manejar los tokens
//=====================
.factory('Auth', function($http, $q, AuthToken) {

  // crear el objeto auth factory
  var authFactory = {};

  // log a user in
  authFactory.login = function(username, password) {

    // return the promise object and its data
    return $http.post('/api/authenticate', {
      username: username,
      password: password
    })

    .success(function(data) {
      AuthToken.setToken(data.token);
      return data;
    });
  };

  // log a user out by clearing the token
  authFactory.logout = function() {
    // clear the token
    AuthToken.setToken();
  };

  // check if a user is logged in
  // check if there is a local token
  authFactory.isLoggedIn = function() {
    if (AuthToken.getToken())
      return true;
    else
      return false;
  };

  // get the logged in user
  authFactory.getUser = function() {
    if (AuthToken.getToken())
      return $http.get('/api/me');
    else
      return $q.reject({ message: 'El usuario no tiene token.' });
  };

  // return auth factory object
  return authFactory;
})


  //===================
  // factory para manejar los tokens
  // inyectar $window para guardar el token en lado del cliente
  //===================
  .factory('AuthToken', function($window) {
    var authTokenFactory = {};

    // get the token
    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    // ésta es una función para definir el token o borrarlo
    // si se pasa el token, entonces guárdelo
    // si no hay token, límpielo de local storage
    authTokenFactory.setToken = function(token) {
      if (token)
        &window.localStorage.setItem('token', token);
      else
        &window.localStorage.removeItem('token');
    };

    // set the token or clear the token

    return authTokenFactory;
  })
//===================
// configuración de la app para integrar los tokens a los requests
//===================
.factory('AuthInterceptor', function($q, AuthToken) {
  var interceptorFactory = {};

  // pegar el token para cada request

  // redireccionar si el token no está autenticado

  return interceptorFactory;

});

})
