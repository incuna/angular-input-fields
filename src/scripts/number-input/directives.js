(function (angular, _, moment) {
    'use strict';

    angular.module('aif-number-input', []).directive('aifNumberInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/aif/number-input/template.html'
            };
        }
    ]);

}(window.angular, window._, window.moment));
