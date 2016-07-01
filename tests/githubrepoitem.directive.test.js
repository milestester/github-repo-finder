describe('githubRepoItem', function() {
  var $compile, $rootScope;

  beforeEach(module('repoFinderApp'));
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Checks HTML of single repo item, no description', function() {
    var scope = $rootScope.$new();
    scope.userData = [ {name: "Test Repo", html_url: "www.test.com"} ];
    var element = $compile("<github-repo-item></github-repo-item>")(scope);
    $rootScope.$digest();
    expect(element.children().html()).toContain('<a ng-href="www.test.com" target="_blank" class="ng-binding" href="www.test.com"> Test Repo </a><p class="ng-binding"> No Description </p>');
  });

  it('Checks HTML of single repo item, with description', function() {
    var scope = $rootScope.$new();
    scope.userData = [ {name: "Test Repo", html_url: "www.test.com", description: "Repo description"} ];
    var element = $compile("<github-repo-item></github-repo-item>")(scope);
    $rootScope.$digest();
    expect(element.children().html()).toContain('<a ng-href="www.test.com" target="_blank" class="ng-binding" href="www.test.com"> Test Repo </a><p class="ng-binding"> Repo description </p>');
  });
});

