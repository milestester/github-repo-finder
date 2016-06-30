describe('$gitHubSearch', function () {
  var gitHubSearch;
  var httpBackend;
  var goodRes = { 'data':
                [
                  {
                  "id": 58664097,
                  "name": "gauge-chrome-extension",
                  "full_name": "milestester/gauge-chrome-extension",
                  "private": false,
                  "html_url": "https://github.com/milestester/gauge-chrome-extension",
                  "description": "Chrome extension for tracking time spent on specified websites"
                  }
                ],
                'userMessage': ""
            };


  var badRes = {errorMessage: "Not Found, Please Search Again"};

  var badGitHubMockRes = {
              data:
                [
                  {
                    "message": "Not Found",
                    "documentation_url": "https://developer.github.com/v3"
                  }
                ],
                status: 404,
                statusText: "Not Found"
            };

  var gitHubMockRes = {
    data: [{
            "id": 58664097,
            "name": "gauge-chrome-extension",
            "full_name": "milestester/gauge-chrome-extension",
            "private": false,
            "html_url": "https://github.com/milestester/gauge-chrome-extension",
            "description": "Chrome extension for tracking time spent on specified websites"
          }]
  };


  beforeEach(module('repoFinderApp'));
  beforeEach(inject(function(_$gitHubSearch_, $httpBackend) {
    gitHubSearch = _$gitHubSearch_;
    httpBackend = $httpBackend;
  }));

  it("should test the service for good response", function () {
    httpBackend.whenGET("https://api.github.com/users/milestester/repos?sort=updated").respond(gitHubMockRes);
    gitHubSearch.userData("milestester").then(function(res) {
      expect(res.data.data[0]).toEqual(goodRes.data[0]);
      expect(res.data).toEqual(gitHubMockRes);
    });
    httpBackend.flush();
  });

  it("should test the service for bad response", function () {
    httpBackend.whenGET("https://api.github.com/users/miles25tester/repos?sort=updated").respond(404, badGitHubMockRes);
    gitHubSearch.userData("miles25tester").then(function(res) {
      expect("Not Found" + res.errorMessage).toEqual(badRes.errorMessage);
    });
    httpBackend.flush();
  });
});

