(function() {
    'use strict';
    angular
        .module('main')
        .config(angularLoadingBar);

    angularLoadingBar.$inject = ['cfpLoadingBarProvider'];

    function angularLoadingBar(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }

})();
