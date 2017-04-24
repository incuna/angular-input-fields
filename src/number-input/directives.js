(function (angular, _, moment) {
    'use strict';

    angular.module('aif-number-input', []).directive('aifNumberInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    disable: '=?',
                    fieldId: '=?',
                    form: '=?'
                },
                templateUrl: 'templates/aif/number-input.html'
            };
        }
    ]);

}(window.angular, window._, window.moment));
