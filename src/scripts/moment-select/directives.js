(function (angular, _, moment) {
    'use strict';

    angular.module('aif-number-padding-filter', []).filter('aifNumberPadding', [
        function () {
            return _.memoize(function (input, numOfDigits) {
                input = input.toString();
                while (input.length < numOfDigits) {
                    input = '0' + input;
                }

                return input;
            }, function (input, numOfDigits) {
                return input + '' + numOfDigits;
            });
        }
    ]);

    angular.module('aif-moment-select', [
        'aif-number-padding-filter'
    ]).directive('aifMomentSelect', [
            '$compile',
        function ($compile) {
            return {
                restrict: 'A',
                scope: {
                    model: '=',
                    disable: '=?',
                    hourMax: '@',
                    minuteMax: '@',
                    hourMin: '@',
                    minuteMin: '@',
                    hourStep: '@',
                    minuteStep: '@',
                    useDuration: '=',
                    hoursLen: '@',
                    minutesLen: '@'
                },
                templateUrl: 'templates/aif/moment-select/template.html',
                compile: function (element, attrs) {
                    // Add default attributes
                    _.defaults(attrs, {
                        hourMin: '0',
                        hourMax: '24',
                        hourStep: '1',
                        minuteMin: '0',
                        minuteMax: '60',
                        minuteStep: '1',
                        useDuration: false,
                        hoursLen: '0',
                        minutesLen: '0'
                    });

                    // Return the (post) link function
                    return function (scope, element, attrs) {
                        scope.hourChoices = _.range(scope.hourMin, scope.hourMax, scope.hourStep);
                        scope.minuteChoices = _.range(scope.minuteMin, scope.minuteMax, scope.minuteStep);

                        var group = ['hours', 'minutes'];

                        var cast = (scope.useDuration) ? moment.duration : moment;

                        scope.$watchGroup(['hours', 'minutes'], function (newValues) {
                            var hours = newValues[0];
                            var minutes = newValues[1];
                            var timeObject = {};

                            if (angular.isDefined(hours)) {
                                timeObject.hours = hours;
                            }
                            if (angular.isDefined(minutes)) {
                                timeObject.minutes = minutes;
                            }
                            scope.model = cast(timeObject);
                        });

                        var deregisterModelWatch = scope.$watch('model', function (value) {
                            if (angular.isDefined(scope.model)) {
                                value = cast(scope.model);
                                var timeObject = {};
                                var hours = group[0];
                                var minutes = group[1];

                                if (angular.isDefined(hours)) {
                                    timeObject.hours = value.get(hours);
                                }
                                if (angular.isDefined(minutes)) {
                                    timeObject.minutes = value.get(minutes);
                                }
                                angular.extend(scope, timeObject);
                                deregisterModelWatch();
                            }
                        });
                    };
                }
            };
        }
    ]);

}(window.angular, window._, window.moment));