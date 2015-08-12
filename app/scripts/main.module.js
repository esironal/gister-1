(function () {

    'use strict';

    angular.module('main', [
        'ui.router',
        'angular-loading-bar'
    ]).run(run);

    run.$inject = ['$log', '$rootScope', 'ExampleService', 'EXAMPLE_EVENTS'];

    function run(log, $rootScope, exampleService, EVENT) {
        log.debug('carregou o modulo main');

        $rootScope.$on(EVENT.exampleOne, exampleService.exampleOne);
        $rootScope.$on(EVENT.exampleTwo, exampleService.exampleTwo);

        $rootScope.exampleLink = function() {
            $rootScope.$broadcast(EVENT.exampleTwo);
        }

    }

})();
