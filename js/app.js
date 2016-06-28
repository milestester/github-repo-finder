angular.module('repoFinderApp', [])

.controller('RepoController', function($scope, gitHubSearch) {

  $scope.findUser = function(userName) {
    gitHubSearch.userData(userName).then(function(payload) {
      console.log(payload);
      if(payload.status == 200) {
        $scope.error = null;
        $scope.userData = payload.data;
      } else if(payload.status == 404) {
        // Cannot be found on server
        $scope.error = payload.statusText;
      } else {
        // Any other errors from API call
        $scope.error = payload.statusText;
      }
    });
  };
})

.factory('gitHubSearch', function($http) {
  return {
      userData : function(userName) {
        // Sorted and return in updated descending order
        return $http.get("https://api.github.com/users/" + userName + "/repos?sort=updated")
          .then(
            function(payload) {
              return payload;
            },
            function(error) {
              return error;
            }
          );
      }
        // userData : [
        //               {
        //                 "id": 58664097,
        //                 "name": "gauge-chrome-extension",
        //                 "full_name": "milestester/gauge-chrome-extension",
        //                 "private": false,
        //                 "html_url": "https://github.com/milestester/gauge-chrome-extension",
        //                 "description": "Chrome extension for tracking time spent on specified websites"
        //               },
        //               {
        //                 "id": 19523621,
        //                 "name": "milestester.github.io",
        //                 "full_name": "milestester/milestester.github.io",
        //                 "private": false,
        //                 "html_url": "https://github.com/milestester/milestester.github.io",
        //                 "description": "",
        //               },
        //               {
        //                 "id": 25325746,
        //                 "name": "snake.game",
        //                 "full_name": "milestester/snake.game",
        //                 "private": false,
        //                 "html_url": "https://github.com/milestester/snake.game",
        //                 "description": ""
        //               },
        //               {
        //                 "id": 44898337,
        //                 "name": "SpeechRecognitionPlugin",
        //                 "full_name": "milestester/SpeechRecognitionPlugin",
        //                 "private": false,
        //                 "html_url": "https://github.com/milestester/SpeechRecognitionPlugin",
        //                 "description": "W3C Web Speech API - Speech Recognition plugin for PhoneGap",
        //               }
        //             ]
  };
});
