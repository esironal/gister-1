(function () {
    'use strict';

    angular
        .module('main')
        .constant('USER_EVENTS', {
            usersInfoReceived: 'users_info_received',
            loadUserInfo: 'load_user_info',
            usersReposInfoReceived: 'users_repos_info_received',
            usersRepoCommits: 'users_repo_commits',
            asyncCallError: 'async_call_error'
        });

})();
