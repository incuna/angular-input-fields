(function (angular, _, moment) {
    'use strict';

    var module = angular.module('angular-input-fields', [
        'vr.directives.slider',
        'ui.bootstrap.buttons',
        'angular-bind-html-compile',
        'gettext'
    ]);

    module.directive('aifSingleChoiceInput', [
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

    module.directive('aifSelectInput', [
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
    module.directive('aifGroupedSelectInput', [
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
                                        // Disable linter checks for camelcase variable names since these come from
                                        //  the django API which we have no control over.
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
                                // Disable linter checks for camelcase variable names since these come from
                                //  the django API which we have no control over.
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

    module.directive('aifRadioInput', [
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

    module.directive('aifCheckboxInput', [
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

    module.directive('aifBooleanInput', [
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

    module.directive('aifTextInput', [
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

    module.directive('aifNumberInput', [
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

    module.directive('aifSliderInput', [
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

    module.directive('aifSwitchInput', [
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

    module.filter('aifNumberPadding', [
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

    module.directive('aifMomentSelect', [
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
