angular.module('aif-text-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/text-input.html',
    "<div class=text-input-wrapper><input class=text-input id=\"{{ fieldId }}\" type=text ng-model=model ng-disabled=disable></div>"
  );

}]);
