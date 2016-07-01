describe('RepoController', function () {
  var controller, scope, svc, def
  var res = {
              'data':
                  [{
                    "id": 58664097,
                    "name": "gauge-chrome-extension",
                    "full_name": "milestester/gauge-chrome-extension",
                    "private": false,
                    "html_url": "https://github.com/milestester/gauge-chrome-extension",
                    "description": "Chrome extension for tracking time spent on specified websites"
                  }],
              'userMessage': ""
            };
  var badRes = {errorMessage: "Not Found, Please Search Again"};

  beforeEach(module('repoFinderApp'));
  beforeEach(inject(function($controller, $rootScope, $q) {
    def = $q.defer();
    svc = {
      userData: function (userName) {
        return def.promise;
      }
    };
    scope = $rootScope.$new();
    controller = $controller('RepoController', {
      $scope: scope,
      $gitHubSearch: svc
    });
  }));

  it('checks initial values of scope variables on controller initialization', function () {
    expect(scope.title).toBe("Github Repository Finder");
    expect(scope.subtitle).toBe("Search Below By Username to Find Repositories");
    expect(scope.slide).toBe(false);
    expect(scope.userData).toEqual(undefined);
    expect(scope.userMessage).toEqual(undefined);
  });

  describe('$scope.title', function () {
    it('checks the title of the index page', function () {
        expect(scope.title).toBe("Github Repository Finder");
    });
  });

  describe('$scope.subtitle', function () {
    it('checks the subtitle of the index page', function () {
      expect(scope.subtitle).toBe("Search Below By Username to Find Repositories");
    });
  });

  describe('tests $scope.clear()', function () {
    it('checks scope variables after clear function is called', function () {
      scope.clear();
      expect(scope.userName).toBe("");
      expect(scope.userData).toEqual([]);
      expect(scope.userMessage).toBe("");
      expect(scope.slide).toBe(false);
    });
  });

  describe('tests $scope.findUser(userName)', function () {
    it('checks for 200 response', function () {
      spyOn(svc, 'userData').and.callThrough();
      def.resolve(res);
      scope.findUser('fakeUser');
      scope.$digest();
      expect(svc.userData).toHaveBeenCalled();
      expect(scope.userData).toBe(res.data);
      expect(scope.slide).toBe(true);
    });

    it('checks for 404 response', function () {
      spyOn(svc, 'userData').and.callThrough();
      def.resolve(badRes);
      scope.findUser('fakeUser');
      scope.$digest();
      expect(svc.userData).toHaveBeenCalled();
      expect(scope.userData).toBe(undefined);
      expect(scope.userMessage).toBe("Not Found, Please Search Again");
      expect(scope.slide).toBe(true);
    });

    it('checks when no username is entered', function () {
      scope.findUser();
      expect(scope.userData).toBe(undefined);
      expect(scope.slide).toBe(false);
      expect(scope.userMessage).toBe("No Username Entered");
    });
  });
});

