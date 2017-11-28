myApp.controller('MockController', function(UserService, $http) {
    console.log('MockController created');
    var vm = this;
    vm.sensors = [];
    getSensors();
    // Only call this one time
    vm.addDoor = function(sensorName) {
        var sensor = {
            type: 'door',
            name: sensorName,
            isOpen: false,
        };
        console.log('creating a sensor');
        $http.post('/security/sensor', sensor).then(function(response){
            getSensors();
            console.log('created a sensor!!');
        });
    }

    function getSensors() {
        $http.get('/security/all').then(function(response) {
            // Append to a select dropdown
            console.log(response);
            vm.sensors = response.data;
        });
    }

    vm.openDoor = function(sensorId){

      console.log('creating a sensor');
      $http.put('/security/history/open/' + sensorId).then(function(response){
          getSensors();
          console.log('created a sensor!!');
      });
    }

    vm.closeDoor = function(sensorId){
      console.log('creating a sensor');
      $http.put('/security/history/close/' + sensorId).then(function(response){
          getSensors();
          console.log('created a sensor!!');
      });
    }

    vm.toggleAlarm = function() {
      $http.put('/user/toggleAlarm').then(function(response){
        console.log('success');
      });
    }

  });
