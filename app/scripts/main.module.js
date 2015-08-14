(function () {

    'use strict';

    angular.module('main', [
        'ui.router',
        'angular-loading-bar'
    ]).run(run);

    run.$inject = ['$log', '$rootScope', 'UserService', 'USER_EVENTS'];

    function run(log, $rootScope, userService, EVENT) {
        $rootScope.loadUserInfo = function() {
            $rootScope.$broadcast(EVENT.loadUserInfo);
        }
    }

})();
