describe("Getting users repository data", function() {
    var $rootScope;
    var $controller;
    beforeEach(module("main"));
    beforeEach(inject(function($injector) {

        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();

    }));

    it('should return the profile', inject(function($controller, $httpBackend){
        var scope = {};
        $httpBackend
            .when('GET', 'https://api.github.com/users/giubueno/repos')
            .respond({
                "login": "giubueno",
                "id": 694113,
                "avatar_url": "https://avatars.githubusercontent.com/u/694113?v=3",
                "gravatar_id": "",
                "url": "https://api.github.com/users/giubueno",
                "html_url": "https://github.com/giubueno",
                "followers_url": "https://api.github.com/users/giubueno/followers",
                "following_url": "https://api.github.com/users/giubueno/following{/other_user}",
                "gists_url": "https://api.github.com/users/giubueno/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/giubueno/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/giubueno/subscriptions",
                "organizations_url": "https://api.github.com/users/giubueno/orgs",
                "repos_url": "https://api.github.com/users/giubueno/repos",
                "events_url": "https://api.github.com/users/giubueno/events{/privacy}",
                "received_events_url": "https://api.github.com/users/giubueno/received_events",
                "type": "User",
                "site_admin": false,
                "name": "Giulliano Bueno",
                "company": "TByte Processamento de Dados Ltda",
                "blog": "www.e-processamento.com",
                "location": "Rio de Janeiro, Brazil",
                "email": "giulliano@e-processamento.com",
                "hireable": true,
                "bio": null,
                "public_repos": 47,
                "public_gists": 7,
                "followers": 5,
                "following": 8,
                "created_at": "2011-03-28T01:20:14Z",
                "updated_at": "2015-08-12T12:37:01Z"
            });
        var userController = $controller('UserController', {
            $scope: scope
        });

        userController.loadUserInfo();
        $httpBackend.flush();

        scope.profile.should.contain('avatar_url');
    }));

});