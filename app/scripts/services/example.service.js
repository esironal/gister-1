(function () {
    'use strict';

    angular
        .module('main')
        .service('ExampleService', exampleService);

    exampleService.$inject = ['$log', '$rootScope', 'EXAMPLE_EVENTS'];

    function exampleService(log, $rootScope, EVENT) {

        this.exampleOne = function () {
            log.debug('executou o metodo exampleOne do exampleService');
        };

        this.exampleTwo = function () {
            log.debug('executou o metodo exampleTwo do exampleService');
        };

        this.getUsersInfo = function (username) {
            $http.get('https://api.github.com/users/' + username).
            then(function(response) {
                log.debug(response.data);
                $rootScope.$broadcast(EVENT.usersInfoReceived, response);
            }, function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
    }
})();
