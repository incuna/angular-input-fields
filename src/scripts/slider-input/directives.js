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
