(function (angular, _, moment) {
    'use strict';

    var module = angular.module('angular-input-fields', ['gettext']);

    module.directive('singleChoiceInput', [
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
                templateUrl: 'templates/type/single-choice-input.html'
            };
        }
    ]);

    module.directive('selectInput', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    model: '=',
                    choices: '=',
                    disable: '=?',
                    emptyLabel: '=?'
                },
                templateUrl: 'templates/type/select-input.html'
            };
        }
    ]);

    // Renders a pair of select inputs, one for the groups and the other for the
    // selected group's choices.
    module.directive('groupedSelectInput', [
        'gettextCatalog',
        function (gettextCatalog) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    groupedChoices: '=',
                    disable: '=?',
                    emptyLabel: '=?'
                },
                templateUrl: 'templates/type/grouped-select-input.html',
                link: function (scope, element, attrs) {

                    // Helper method to get a group's choice based on a value.
                    // Returns undefined if no choice is found.
                    var getGroupChoice = function (group, value) {
                        if (angular.isDefined(group)) {
                            return _.findWhere(group.choices, {
                                value: value
                            });
                        }
                    };

                    // Set initialise groups when choice change.
                    scope.$watch('groupedChoices', function (groupedChoices) {
                        scope.groups = [];
                        scope.group = {
                            choices: []
                        };
                        if (angular.isDefined(groupedChoices)) {
                            var otherChoices = [];
                            angular.forEach(groupedChoices, function (item) {
                                if (angular.isDefined(item.choices)) {
                                    // Group with choices

                                    if (scope.emptyLabel && angular.isUndefined(getGroupChoice(item, ''))) {
                                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                                        /* jshint camelcase: false */

                                        // Add the emptyLabel to the start of choices.
                                        item.choices.unshift({
                                            display_name: scope.emptyLabel,
                                            value: ''
                                        });
                                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                                    }

                                    // Reference the item as the value so it is
                                    // used when the item is selected.
                                    item.value = item;

                                    scope.groups.push(item);
                                } else {
                                    // Choice that does not belong to a group
                                    otherChoices.push(item);
                                }
                            });
                            if (otherChoices.length) {
                                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                                /* jshint camelcase: false */
                                scope.groups.push({
                                    display_name: gettextCatalog.getString('Other'),
                                    choices: otherChoices
                                });
                                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                            }
                        }
                    });

                    // Set group when model changes.
                    scope.$watch('model', function (value) {
                        if (angular.isDefined(value) && value !== null) {
                            angular.forEach(scope.groupedChoices, function (group) {
                                if (angular.isDefined(getGroupChoice(group, value))) {
                                    scope.group = group;
                                }
                            });
                        }
                    });

                    // Check model is valid when group changes.
                    scope.$watch('group', function (group) {
                        if (group !== null && angular.isDefined(getGroupChoice(group, scope.model))) {
                            // Model is one of the group choices.
                            return;
                        }

                        scope.model = null;
                    });
                }
            };
        }
    ]);

    module.directive('radioInput', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    model: '=',
                    choices: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/type/radio-input.html',
                link: function (scope) {
                    scope.localModel = {
                        value: scope.model
                    };

                    scope.$watch('localModel.value', function (value) {
                        scope.model = value;
                    });
                }
            };
        }
    ]);

    module.directive('checkboxInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    label: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/type/checkbox-input.html'
            };
        }
    ]);

    module.directive('booleanInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'templates/type/boolean-input.html',
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

    module.directive('textInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/type/text-input.html'
            };
        }
    ]);

    module.directive('numberInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/type/number-input.html'
            };
        }
    ]);

    module.directive('sliderInput', [
        'gettextCatalog',
        function (gettextCatalog) {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'templates/type/slider-input.html',
                scope: {
                    model: '=',
                    disable: '=?',
                    ceiling: '=?',
                    translateFn: '=?',
                    className: '@'
                },
                link: function (scope, element, attrs) {
                    if (angular.isUndefined(scope.translateFn)) {
                        scope.translateFn = function (input) {
                            return input;
                        };
                    }

                    if (angular.isUndefined(scope.className)) {
                        scope.className = null;
                    }

                    if (angular.isUndefined(scope.ceiling)) {
                        scope.ceiling = 10;
                    }

                    scope.sliderLowLabel = attrs.sliderLowLabel || gettextCatalog.getString('none');
                    scope.sliderMiddleLabel = attrs.sliderMiddleLabel;
                    scope.sliderHighLabel = attrs.sliderHighLabel || gettextCatalog.getString('very severe');
                }
            };
        }
    ]);

    module.directive('switchInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    choices: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/type/switch-input.html',
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

    module.filter('numberPadding', [
        function () {
            return _.memoize(function (input, numOfDigits) {
                input = input.toString();
                while (input.length < numOfDigits) {
                    input = '0' + '' + input;
                }

                return input;
            }, function (input, numOfDigits) {
                return input + '' + numOfDigits;
            });
        }
    ]);

    module.directive('momentSelect', [
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
                templateUrl: 'templates/type/moment-select.html',
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

                        scope.$watch('[hours, minutes]', function (newValues) {
                            if (_.all(newValues, angular.isDefined)) {
                                var values = _.object(_.map(group, function (key) {
                                    return [key, scope[key] || 0];
                                }));

                                scope.model = cast(values);

                            }
                        }, true);
                        scope.$watch('model', function (value) {
                            if (angular.isDefined(value)) {
                                value = cast(value);
                                var values = _.object(_.map(group, function (key) {
                                    return [key, value.get(key)];
                                }));
                                angular.extend(scope, values);
                            }
                        });
                    };
                }
            };
        }
    ]);

}(window.angular, window._, window.moment));
