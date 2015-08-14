(function() {
    'use strict';
    angular
        .module('main')
        .config(route);

    route.$inject = ['$stateProvider', '$urlRouterProvider'];

    function route($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('', '/example');

        $stateProvider
            .state('default', {
                url: '',
                abstract: true,
                templateUrl: 'layouts/default.html'
            })
            .state('example', {
                parent: 'default',
                url: '/example',
                templateUrl: '../../views/usersInfo.html',
                controller: 'UserController as vm',
                controllerAs: 'vm'
            });
    }

})();
