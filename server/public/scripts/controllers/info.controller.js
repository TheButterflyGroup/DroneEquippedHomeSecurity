myApp.controller('InfoController', function (UserService) {
  console.log('InfoController created');
  var vm = this;
  
  vm.userService = UserService;

  vm.sensorObject = { data: [] };
  
  vm.sensorStatus = function () {
    $http.get('/security/all').then(function (response) { 
      vm.sensorObject.data = response.data;
      console.log('in getDoorStatus:', vm.sensorObject.data);
    }); //end $http get
  }//end sensorStatus

});
