(function () {
    'use strict';

    angular
        .module('main')
        .service('UserService', userService);

    userService.$inject = ['$log', '$rootScope', 'USER_EVENTS', '$http'];

    function userService(log, $rootScope, EVENT, $http) {
        /**
         * This method will broadcast an event called EVENT.usersInfoReceived.
         * @param username
         */
        this.getUsersInfo = function (username) {
            $http.get('https://api.github.com/users/' + username).
            then(function(response) {
                $rootScope.$broadcast(EVENT.usersInfoReceived, response.data);
            }, function(response) {
                $rootScope.$broadcast(EVENT.asyncCallError, response);
            });

            $http.get('https://api.github.com/users/' + username + '/repos').
            then(function(response) {
                $rootScope.$broadcast(EVENT.usersReposInfoReceived, response.data);
            }, function(response) {
                $rootScope.$broadcast(EVENT.asyncCallError, response);
            });
        };
    }
})();
