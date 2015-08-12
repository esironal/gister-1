(function () {
    'use strict';

    angular
        .module('main')
        .controller('ExampleController', exampleController);

    exampleController.$inject = ['$q', '$log', '$rootScope', 'EXAMPLE_EVENTS'];

    function exampleController($q, log, $rootScope, EVENT) {
        var vm = this;

        activate();

        function activate() {
            var promises = [
                broadcastExampleOneEvent(),
                setVmVariables()
            ];
            return $q.all(promises).then(function () {
                log.info('Carregou o controller ExampleController');
            });
        }

        function broadcastExampleOneEvent() {
            $rootScope.$broadcast(EVENT.exampleOne);
        }

        function setVmVariables() {
            vm.message = 'Exemplo';
            vm.link = exampleFunction;
        }

        function exampleFunction() {
            vm.message = 'Exemplo 2';
        }

    }

})();
