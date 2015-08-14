(function () {
    'use strict';

    angular
        .module('main')
        .controller('UserController', userController);

    userController.$inject = ['$q', '$log', '$rootScope', '$scope',
        'USER_EVENTS', 'UserService'];

    function userController($q, log, $rootScope, $scope, EVENT, userService) {
        var vm = this;

        activate();

        function activate() {
            $rootScope.$on(EVENT.usersInfoReceived, setUserInfo);
            $rootScope.$on(EVENT.usersReposInfoReceived, setUsersReposInfo);
            $rootScope.$on(EVENT.usersRepoCommits, setUsersRepoCommits);
            $rootScope.$on(EVENT.loadUserInfo, loadUserInfo);
        }

        function loadUserInfo() {
            // call the service, the result will be returned to setUserInfo via event
            userService.getUsersInfo($scope.username);
        }

        function setUserInfo(scope, data) {
            vm.profile = data;
        }

        function setUsersReposInfo(scope, data) {
            vm.repos = data;
        }

        function setUsersRepoCommits(scope, data) {
            vm.selectedRepo = data
        }
    }

})();
