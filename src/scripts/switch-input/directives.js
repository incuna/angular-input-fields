(function (angular, _, moment) {
    'use strict';

    angular.module('aif-switch-input', [
        'ui.bootstrap.buttons'
    ]).directive('aifSwitchInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    choices: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/aif/switch-input/template.html',
                link: function (scope, element, attrs) {
                    // Work around btn-radio ng-model bind issues
                    scope.data = {
                        model: scope.model
                    };
                    scope.$watch('model', function (value) {
                        if (angular.isDefined(value)) {
                            scope.data.model = value;
                        }
                    });
                    scope.$watch('data.model', function (value) {
                        if (angular.isDefined(value)) {
                            scope.model = value;
                        }
                    });
                }
            };
        }
    ]);
}(window.angular, window._, window.moment));
