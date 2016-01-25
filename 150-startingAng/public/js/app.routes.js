// inyectar ngRoute para las necesidades de enrutamiento
angular.module('routerRoutes', ['ngRoute'])

// configurar las rutas
.config(function($routeProvider, $locationProvider) {
  $routeProvider

  // ruta para el inicio
  .when ('/', {
    templateUrl   : 'views/pages/inicio.html',
    controller    : 'inicioController',
    controllerAs  : 'inicio'
  })

  // ruta para nosotros page
  .when ('/nosotros', {
    templateUrl   : 'views/pages/nosotros.html',
    controller    : 'nosotrosController',
    controllerAs  : 'nosotros'
  })

  // ruta para página de contacto
  .when ('/contacto', {
    templateUrl   : 'views/pages/contacto.html',
    controller    : 'contactoController',
    controllerAs  : 'contacto'
  });

  // quitar el # symbol
  $locationProvider.html5Mode(true);
});
