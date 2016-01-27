// start our angular module and inject userService
angular.module('userCtrl', ['userService'])

//user controller for the main page
// inject the User factory
.controller('userController', function(User) {

  var vm = this;

  // set a processing variable to show loading things
  vm.processing = true;

  // grab all the users at page load
  User.all().then(function(data) {

    // when all the users come back, remove the processing variable
    vm.processing = false;

    // bind the users that come bck to vm.users
    vm.users = data.data;
  });

  // function to delete a user
  vm.deleteUser = function(id) {
    vm.processing = true;

    User.delete(id)
      .success(function(data) {
        // get all users to update the table
        User.all()
          .success(function(data) {
            vm.processing = false;
            vm.users = data;
          });
      });
  };

})

// controller applied to user creation page
.controller('userCreateController', function(User) {
  var vm = this;

  // this variable hide/show elements of the views
  // differentiates between create or edit pages
  vm.type = 'create';

  // function to create a user
  vm.saveUser = function() {
    vm.processing = true;
    // clear the message
    vm.message = '';

    // use the create function in the userService
    User.create(vm.userData)
      .success(function(data) {
        vm.processing = false;

        // clear the form
        vm.userData = {};
        vm.message = data.message;
      });

  };
})
