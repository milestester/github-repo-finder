angular.module('repoFinderApp', ['ngLoadingSpinner'])

.controller('RepoController', function($scope, $gitHubSearch) {
  $scope.title = "Github Repository Finder";
  $scope.subtitle = "Search Below By Username to Find Repositories";
  $scope.slide = false;
  $scope.findUser = function(userName) {
    if(userName) {
      $gitHubSearch.userData(userName).then(function(res) {
        if(res.data) {
          $scope.userMessage = res.userMessage;
          $scope.userData = res.data;
        } else {
          $scope.userMessage = res.errorMessage;
        }
        $scope.slide = true;
      });
    } else {
      $scope.slide = false;
      $scope.userMessage = "No Username Entered";
    }
  };

  $scope.clear = function() {
    $scope.userName = "";
    $scope.userData = [];
    $scope.userMessage = "";
    $scope.slide = false;
  };
})

.factory('$gitHubSearch', function($http) {
  return {
      userData : function(userName) {
        // Sorted and return in updated descending order
        return $http.get("https://api.github.com/users/" + userName + "/repos?sort=updated")
          .then(
            function(payload) {
              var repos = {};
              repos.data = payload.data;
              if(repos.data.length == 0) {
                repos.userMessage = "No Repositories Found for Given User";
              } else {
                repos.userMessage = "";
              }
              return repos;
            },
            function(error) {
              var errorData = {};
              if(error.status == 404) {
                // Special Case 2: Username Cannot Be Found
                errorData.errorMessage = error.statusText + ", Please Search Again";
              } else {
                // Special Case 3: Any other errors from API call, log to console
                console.log(error);
                errorData.errorMessage = "Error Occured, Please Search Again";
              }
              return errorData;
            }
          );
      }
  };
});
