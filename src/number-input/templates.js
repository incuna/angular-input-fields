angular.module('aif-number-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/number-input.html',
    "<div class=number-input-wrapper><input class=number-input id=\"{{ fieldId }}\" type=number ng-model=model ng-disabled=disable></div>"
  );

}]);
