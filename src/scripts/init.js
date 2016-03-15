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
