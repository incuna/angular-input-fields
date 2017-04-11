(function (angular, _, moment) {
    'use strict';

    angular.module('aif-radio-input', []).directive('aifRadioInput', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    model: '=',
                    choices: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/aif/radio-input.html',
                link: function (scope) {
                    scope.localModel = {};
                    var modelWatchDeregister = scope.$watch('model', function (value) {
                        if (angular.isDefined(value)) {
                            scope.localModel = {
                                value: scope.model
                            };
                            // Deregister the watch to avoid having a loop with the $watch below
                            modelWatchDeregister();
                        }
                    });
                    scope.$watch('localModel.value', function (value) {
                        scope.model = value;
                    });
                }
            };
        }
    ]);

}(window.angular, window._, window.moment));
