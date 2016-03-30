(function (angular, _, moment) {
    'use strict';

    angular.module('aif-boolean-input', []).directive('aifBooleanInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'templates/aif/boolean-input/template.html',
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

(function (angular, _, moment) {
    'use strict';

    // Renders a pair of select inputs, one for the groups and the other for the
    // selected group's choices.
    angular.module('aif-grouped-select-input', [
        'aif-select-input',
        'gettext'
    ]).directive('aifGroupedSelectInput', [
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
                templateUrl: 'templates/aif/grouped-select-input/template.html',
                link: function (scope, element, attrs) {

                    // Helper method to get a group's choice based on a value.
                    // Returns undefined if no choice is found.
                    var getGroupChoice = function (group, value) {
                        if (angular.isDefined(group)) {
                            return _.find(group.choices, {
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
}(window.angular, window._, window.moment));

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

    angular.module('aif-add-suffix-filter', []).filter('aifAddSuffix', [
        function () {
            return _.memoize(function (input, suffix) {
                if (angular.isUndefined(suffix)) {
                    return input;
                }
                return input + '' + suffix;
            }, function (input, suffix) {
                return input + '' + suffix;
            });
        }
    ]);

    angular.module('aif-moment-select', [
        'aif-number-padding-filter',
        'aif-add-suffix-filter'
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
                    minutesLen: '@',
                    hoursSuffix: '@',
                    minutesSuffix: '@'
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
                            var hours = scope.hours;
                            var minutes = scope.minutes;
                            var timeObject = {};

                            if (angular.isDefined(hours)) {
                                timeObject.hours = hours;
                            }
                            if (angular.isDefined(minutes)) {
                                timeObject.minutes = minutes;
                            }
                            scope.model = cast(timeObject);
                        });

                        scope.$watch('model', function (value) {
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
                            }
                        });
                    };
                }
            };
        }
    ]);

}(window.angular, window._, window.moment));

(function (angular, _, moment) {
    'use strict';

    angular.module('aif-number-input', []).directive('aifNumberInput', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    model: '=',
                    disable: '=?'
                },
                templateUrl: 'templates/aif/number-input/template.html'
            };
        }
    ]);

}(window.angular, window._, window.moment));

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
                templateUrl: 'templates/aif/radio-input/template.html',
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

(function (angular, _, moment) {
    'use strict';

    angular.module('aif-select-input', []).directive('aifSelectInput', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    model: '=',
                    choices: '=',
                    disable: '=?',
                    emptyLabel: '=?'
                },
                templateUrl: 'templates/aif/select-input/template.html'
            };
        }
    ]);

}(window.angular, window._, window.moment));

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

(function (angular, _, moment) {
    'use strict';

    angular.module('aif-slider-input', [
        'vr.directives.slider',
        'gettext'
    ]).directive('aifSliderInput', [
        'gettextCatalog',
        function (gettextCatalog) {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'templates/aif/slider-input/template.html',
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

}(window.angular, window._, window.moment));

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

angular.module('aif-boolean-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/boolean-input/template.html',
    "<div><div class=radio><label class=control-label><input type=radio ng-model=boolValue value=true ng-disabled=disable> <span translate>Yes</span></label><label class=control-label><input type=radio ng-model=boolValue value=false ng-disabled=disable> <span translate>No</span></label></div><select class=select ng-model=boolValue ng-disabled=disable><option value=true translate>Yes</option><option value=false translate>No</option></select></div>"
  );

}]);

angular.module('aif-checkbox-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/checkbox-input/template.html',
    "<div class=checkbox><label class=\"control-label input-wrapper\"><input type=checkbox ng-model=model ng-disabled=disable> <span bind-html-compile=label></span></label></div>"
  );

}]);

angular.module('aif-grouped-select-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/grouped-select-input/template.html',
    "<div class=grouped-select-wrapper><div class=primary aif-select-input model=group choices=groups disable=disable empty-label=emptyLabel></div><div class=secondary aif-select-input model=model choices=group.choices disable=\"disable || !group.choices.length\"></div></div>"
  );

}]);

angular.module('aif-moment-select').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/moment-select/template.html',
    "<div class=duration-select-wrapper><table><tbody><tr><td><select class=select ng-model=hours ng-disabled=disable ng-options=\"hour as (hour|aifNumberPadding:hoursLen|aifAddSuffix:hoursSuffix) for hour in hourChoices\"></select></td><td><select class=select ng-model=minutes ng-disabled=disable ng-options=\"minute as (minute|aifNumberPadding:minutesLen|aifAddSuffix:minutesSuffix) for minute in minuteChoices\"></select></td></tr></tbody></table></div>"
  );

}]);

angular.module('aif-number-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/number-input/template.html',
    "<div><label class=\"control-label input-wrapper\"><input type=number ng-model=model ng-disabled=disable></label></div>"
  );

}]);

angular.module('aif-radio-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/radio-input/template.html',
    "<div class=radio-wrapper><div class=radio ng-repeat=\"choice in choices\"><label class=control-label><input type=radio ng-model=localModel.value ng-value=choice.value ng-disabled=disable> {{ choice.display_name }}</label></div></div>"
  );

}]);

angular.module('aif-select-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/select-input/template.html',
    "<div class=select-wrapper><select class=select ng-model=model ng-disabled=disable ng-options=\"choice.value as choice.display_name for choice in choices\"><option value=\"\" ng-if=emptyLabel ng-bind=emptyLabel></option></select></div>"
  );

}]);

angular.module('aif-single-choice-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/single-choice-input/template.html',
    "<div class=single-choice-wrapper><div aif-radio-input model=model choices=choices disable=disable></div><div aif-select-input model=model empty-label=emptyLabel choices=choices disable=disable></div></div>"
  );

}]);

angular.module('aif-slider-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/slider-input/template.html',
    "<div class=\"input-wrapper slider-wrapper\"><div slider ng-class=className translate-fn=translateFn ng-model=model floor=0 step=1 no-bubble-adjustment=true pointer-width-override=28 ceiling=\"{{ ceiling }}\" ng-disabled=disable></div><div class=step-indicator-container><span class=\"step perc-0\" ng-bind=sliderLowLabel></span> <span ng-if=sliderMiddleLabel class=\"step perc-50\" ng-bind=sliderMiddleLabel></span> <span class=\"step perc-100\" ng-bind=sliderHighLabel></span></div></div>"
  );

}]);

angular.module('aif-switch-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/switch-input/template.html',
    "<div class=\"input-wrapper switch-wrapper\"><div class=switch><div ng-repeat=\"choice in choices\" class=option ng-model=data.model uib-btn-radio=choice.value>{{ choice.display_name }}</div></div></div>"
  );

}]);

angular.module('aif-text-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/text-input/template.html',
    "<div><label class=\"control-label input-wrapper\"><input type=text ng-model=model ng-disabled=disable></label></div>"
  );

}]);

(function (angular, _, moment) {
    'use strict';

    angular.module('angular-input-fields', [
        'aif-single-choice-input',
        'aif-grouped-select-input',
        'aif-checkbox-input',
        'aif-boolean-input',
        'aif-text-input',
        'aif-number-input',
        'aif-slider-input',
        'aif-switch-input',
        'aif-moment-select'
    ]);

}(window.angular, window._, window.moment));
