(function (angular, _, moment) {
    'use strict';

    angular.module('aif-checkbox-input', [
        'angular-bind-html-compile'
    ]).directive('aifCheckboxInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    label: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/aif/checkbox-input/template.html'
            };
        }
    ]);

}(window.angular, window._, window.moment));
