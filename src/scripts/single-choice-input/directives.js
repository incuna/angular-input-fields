(function (angular, _, moment) {
    'use strict';

    angular.module('aif-single-choice-input', [
        'aif-select-input',
        'aif-radio-input'
    ]).directive('aifSingleChoiceInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    choices: '=',
                    disable: '=?',
                    emptyLabel: '=?'
                },
                templateUrl: 'templates/aif/single-choice-input/template.html'
            };
        }
    ]);

}(window.angular, window._, window.moment));
