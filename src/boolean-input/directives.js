(function (angular, _, moment) {
    'use strict';

    angular.module('aif-boolean-input', []).directive('aifBooleanInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'templates/aif/boolean-input.html',
                scope: {
                    model: '=',
                    disable: '=?'
                },
                link: function (scope, element, attrs) {

                    scope.$watch('boolValue', function () {
                        var value = false;

                        if (scope.boolValue === 'true') {
                            value = true;
                        }

                        scope.model = value;
                    });

                }
            };
        }
    ]);

}(window.angular, window._, window.moment));
