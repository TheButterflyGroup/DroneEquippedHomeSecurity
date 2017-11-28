myApp.controller('InfoController', function (UserService, $http) {
  console.log('InfoController created');
  var vm = this;

  socket.on('refresh', function (data) {
    vm.sensorStatus();
  });

  vm.userService = UserService;

  vm.sensorObject = { data: [] };

  vm.sensorStatus = function () {
    console.log('in vm.sensorStatus');
    $http.get('/security/all').then(function (response) {
      vm.sensorObject.data = response.data;
      console.log('in getDoorStatus:', vm.sensorObject.data);
    }); //end $http get
  }//end sensorStatus

  vm.sensorStatus();
});
