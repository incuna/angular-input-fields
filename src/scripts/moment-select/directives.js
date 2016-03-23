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
                            if (angular.isUndefined(scope.model)) {
                                throw new Error('aif-moment-select: model is not defined');
                            }
                            var hours = scope.hours;
                            var minutes = scope.minutes;
                            var timeObject = {
                                hours: (scope.model._isAMomentObject) ? scope.model.get('hours') : 0,
                                minutes: (scope.model._isAMomentObject) ? scope.model.get('minutes') : 0
                            };

                            if (angular.isDefined(hours)) {
                                timeObject.hours = hours;
                            }
                            if (angular.isDefined(minutes)) {
                                timeObject.minutes = minutes;
                            }
                            scope.model = cast(timeObject);
                        });

                        scope.$watch('model', function (newValue, oldValue) {
                            oldValue = cast(oldValue);
                            if (angular.isDefined(newValue)) {
                                newValue = cast(newValue);
                                var timeObject = {};
                                var hours = group[0];
                                var minutes = group[1];

                                timeObject.hours = newValue.get(hours) || 0;
                                timeObject.minutes = newValue.get(minutes) || 0;

                                var newTimeObject = {
                                    minutes: (scope.minutes !== timeObject.minutes) ? timeObject.minutes : scope.minutes,
                                    hours: (scope.hours !== timeObject.hours) ? timeObject.hours : scope.hours
                                };

                                angular.extend(scope, newTimeObject);
                            }
                        });
                    };
                }
            };
        }
    ]);

}(window.angular, window._, window.moment));
