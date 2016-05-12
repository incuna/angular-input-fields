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

                        // When the value is null set the set box display to select.
                        if (value === null) {
                            scope.model = '';
                        }
                        if (angular.isDefined(value) && value !== null && value.length > 0) {
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
