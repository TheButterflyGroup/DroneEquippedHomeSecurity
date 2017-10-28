myApp.controller('InfoController', function (UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;

  vm.doorObject = { data: [] };
  vm.motionObject = { data: [] };

  vm.getDoorStatus = function () {
    $http.get('/security/all').then(function (response) { 
      vm.doorObject.data = response.data;
      console.log('in getDoorStatus:', vm.doorObject.data);
    }); //end $http get
  }//end getSights

  vm.getMotionData = function () {
    $http.get('/security/all').then(function (response) { 
      vm.motionObject.data = response.data;
      console.log('in getMotionData:', vm.motionObject.data);
    }); //end $http get
  }//end getSights



});
