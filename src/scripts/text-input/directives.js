(function (angular, _, moment) {
    'use strict';

    angular.module('aif-text-input', []).directive('aifTextInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/aif/text-input/template.html'
            };
        }
    ]);
}(window.angular, window._, window.moment));
