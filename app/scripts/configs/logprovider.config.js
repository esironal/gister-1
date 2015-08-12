(function() {
    'use strict';
    angular
        .module('main')
        .config(logProvider);

    logProvider.$inject = ['$logProvider'];

    function logProvider($logProvider) {
        $logProvider.debugEnabled(true);
    }

})();
