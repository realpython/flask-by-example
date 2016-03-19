(function () {

  'use strict';

  angular.module('WordcountApp', [])

  .controller('WordcountController', ['$scope', '$log', '$http', '$timeout',
    function($scope, $log, $http, $timeout) {

    $scope.getResults = function() {

      $log.log("test");

      // get the URL from the input
      var userInput = $scope.url;

      // fire the API request
      $http.post('/start', {"url": userInput}).
        success(function(results) {
          $log.log(results);
          getWordCount(results);

        }).
        error(function(error) {
          $log.log(error);
        });

    };

    function getWordCount(jobID) {

      var timeout = "";

      var poller = function() {
        // fire another request
        $http.get('/results/'+jobID).
          success(function(data, status, headers, config) {
            if(status === 202) {
              $log.log(data, status);
            } else if (status === 200){
              $log.log(data);
              $scope.wordcounts = data;
              $timeout.cancel(timeout);
              return false;
            }
            // continue to call the poller() function every 2 seconds
            // until the timeout is cancelled
            timeout = $timeout(poller, 2000);
          });
      };
      poller();
    }

  }
  ]);

}());

