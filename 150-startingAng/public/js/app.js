// así se agrega lo configurado en app.routes.js
angular.module('routerApp', ['routerRoutes'])

// creando los controladores
// éste será el que maneje ENTERO el siio
.controller('mainController', function() {

  var vm = this;

  // crear un mensaje grande para mostrar en la vista
  vm.bigMessage = 'Un mar tranquilo nunca hará a un marino hábil.';
})
// el controlador específico del inicio
.controller('inicioController', function() {

  var vm = this;

  vm.message = '¡Ésta es la página de inicio!';
})

// el controlador de la página de nosotros
.controller('nosotrosController', function() {

  var vm = this;

  vm.message = '¡Ésta es la página sobre nosotros!';
})

// el controlador de la página de contacto
.controller('contactoController', function() {

  var vm = this;

  vm.message = '¡Ésta es la página de contacto!';
});
