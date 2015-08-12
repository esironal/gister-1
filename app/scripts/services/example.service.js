(function () {
    'use strict';

    angular
        .module('main')
        .service('ExampleService', exampleService);

    exampleService.$inject = ['$log'];

    function exampleService(log) {

        this.exampleOne = function () {
            log.debug('executou o metodo exampleOne do exampleService');
        };

        this.exampleTwo = function () {
            log.debug('executou o metodo exampleTwo do exampleService');
        };

    }
})();
