(function (angular, _, moment) {
    'use strict';

    angular.module('aif-select-input', []).directive('aifSelectInput', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    model: '=',
                    choices: '=',
                    disable: '=?',
                    emptyLabel: '=?',
                    fieldId: '=?',
                    form: '=?'
                },
                templateUrl: 'templates/aif/select-input.html'
            };
        }
    ]);

}(window.angular, window._, window.moment));
